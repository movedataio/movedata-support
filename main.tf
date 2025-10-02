terraform {
  backend "s3" {
    bucket = "movedata-state"
    key    = "terraform/support"
    region = "ap-southeast-2"
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
