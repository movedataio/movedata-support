terraform {
  backend "s3" {
    bucket = "movedata-state"
    key    = "terraform/support"
    region = "ap-southeast-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
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

variable "domain_name" {
  default = "support.movedata.io"
  type    = string
}

data "aws_route53_zone" "default" {
  name = "movedata.io"
}

resource "aws_route53_record" "support" {
  zone_id = data.aws_route53_zone.default.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.support.domain_name
    zone_id                = aws_cloudfront_distribution.support.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket" "support_html" {
  bucket = "movedata-support-html"
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

resource "aws_acm_certificate" "support" {
  provider          = aws.us-east-1  # ACM certificates for CloudFront must be in us-east-1
  domain_name       = var.domain_name
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
  aliases             = [var.domain_name]

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
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.support_html.id}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
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