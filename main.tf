terraform {
  backend "s3" {
    bucket = "movedata-state"
    key    = "terraform/support"
    region = "ap-southeast-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.23.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

locals {
  root_domain = (terraform.workspace == "prod") ? "movedata.io" : "${terraform.workspace}.movedata.io"
  domain_name = "support.${local.root_domain}"
}

data "aws_route53_zone" "default" {
  name = local.root_domain
}

resource "aws_route53_record" "support" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = local.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.support.domain_name
    zone_id                = aws_cloudfront_distribution.support.hosted_zone_id
    evaluate_target_health = false
  }
}

// ------------------------------------------------------------------
// Support HTML Website Bucket

resource "aws_s3_bucket" "support_html" {
  bucket = (terraform.workspace == "prod") ? "movedata-support-html" : "${terraform.workspace}-movedata-support-html"
}

resource "aws_s3_bucket_website_configuration" "support_html" {
  bucket = aws_s3_bucket.support_html.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "support_html" {
  bucket = aws_s3_bucket.support_html.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "support_html" {
  bucket = aws_s3_bucket.support_html.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.support_html.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.support_html]
}

// ------------------------------------------------------------------
// Certificate and CloudFront Distribution

resource "aws_acm_certificate" "support" {
  provider          = aws.us-east-1  # ACM certificates for CloudFront must be in us-east-1
  domain_name       = local.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.support.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.default.zone_id
}

resource "aws_acm_certificate_validation" "support" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.support.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_cloudfront_distribution" "support" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [local.domain_name]

  origin {
    domain_name = aws_s3_bucket_website_configuration.support_html.website_endpoint
    origin_id   = "S3-${aws_s3_bucket.support_html.id}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    cache_policy_id        = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.support_html.id}"
    viewer_protocol_policy = "redirect-to-https"

    #forwarded_values {
    #  query_string = false
    #  cookies {
    #    forward = "none"
    #  }
    #}

    min_ttl     = 0
    default_ttl = 0 #3600
    max_ttl     = 0 #86400
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.support.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  depends_on = [aws_acm_certificate_validation.support]
}

// ------------------------------------------------------------------
// AI Model Storage Bucket

resource "aws_s3_bucket" "ai" {
  bucket = "${terraform.workspace}-movedata-ai"
}

resource "aws_s3_bucket_public_access_block" "ai" {
  bucket = aws_s3_bucket.ai.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

// ------------------------------------------------------------------
// AWS Bedrock Knowledge Base

resource "aws_iam_role" "bedrock_kb" {
  name = "${terraform.workspace}-movedata-support-kb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "bedrock.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "bedrock_kb" {
  name = "${terraform.workspace}-bedrock-support-kb-policy"
  role = aws_iam_role.bedrock_kb.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["s3:GetObject", "s3:ListBucket"]
        Resource = [
          "${aws_s3_bucket.ai.arn}",
          "${aws_s3_bucket.ai.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = ["s3vectors:*"]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = ["bedrock:InvokeModel"]
        Resource = [
          "*",
          "arn:aws:bedrock:${data.aws_region.current.id}::foundation-model/amazon.titan-embed-text-v2"
        ]
      },
      {
        Effect = "Allow"
        Action = ["kms:Decrypt"]
        Resource = "*"
      }
    ]
  })
}

// S3 Vector Store: prod-movedata-support-store
// S3 Vector Store Index: prod-movedata-support-store-default-index (Dimensions: 1024 / cosine) - with 
// "metadataConfiguration": {
//    "nonFilterableMetadataKeys": [
//        "AMAZON_BEDROCK_TEXT",
//        "AMAZON_BEDROCK_METADATA",
//        "text"
//    ]
// }

/*
resource "aws_bedrockagent_knowledge_base" "support" {
  name     = "${terraform.workspace}-movedata-support"
  role_arn = aws_iam_role.bedrock_kb.arn

  knowledge_base_configuration {
    type = "VECTOR"
    vector_knowledge_base_configuration {
      embedding_model_arn = "arn:aws:bedrock:${data.aws_region.current.id}::foundation-model/amazon.titan-embed-text-v2"
      embedding_model_configuration {
        bedrock_embedding_model_configuration {
          dimensions = 1024
          embedding_data_type = "FLOAT32"
        }
      }
    }
  }

  storage_configuration {
    type = "S3"

    s3_configuration {
      # TODO: Update to use our own bucket when implemented in terraform
      bucket_arn = "arn:aws:s3vectors:ap-southeast-2:652348831403:bucket/bedrock-knowledge-base-meowv6/index/bedrock-knowledge-base-default-index"
    }
  }
}

resource "aws_bedrockagent_data_source" "support" {
  name              = "support-docs"
  knowledge_base_id = aws_bedrockagent_knowledge_base.support.id
  
  data_source_configuration {
    type = "S3"
    s3_configuration {
      bucket_arn = aws_s3_bucket.ai.arn
    }
  }
}

*/