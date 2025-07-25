output "s3_bucket_name" {
  value = aws_s3_bucket.jasmc-image-upload.bucket
}

output "ecr_repo" {
  value = aws_ecr_repository.jasmc-ecr-repo.repository_url
}
