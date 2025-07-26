variable "region" {
  default     = "us-east-1"
  description = "AWS region"
}

variable "image_upload_bucket_name" {
  default     = "jasmc-image-upload-bucket"
  description = "S3 bucket name for image uploads"
}

variable "frontend_ecr_repo_name" {
  default     = "jasmc-ecr-frontend-repo"
  description = "ECR repository name for frontend"
}

variable "backend_ecr_repo_name" {
  default     = "jasmc-ecr-backend-repo"
  description = "ECR repository name for backend"
}

variable "vpc_name" {
  default = "jasmc-vpc"
}

variable "cluster_name" {
  default = "jasmc-eks-cluster"
}
