output "s3_bucket_name" {
  value = aws_s3_bucket.jasmc-image-upload.bucket
}

output "ecr_frontend_repo_url" {
  value = aws_ecr_repository.jasmc-ecr-frontend-repo.repository_url
}

output "ecr_backend_repo_url" {
  value = aws_ecr_repository.jasmc-ecr-backend-repo.repository_url
}
