terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket  = "jasmc-terraform-state-bucket"
    key     = "envs/prod/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "jasmc-image-upload" {
  bucket = "jasmc-image-upload-bucket"
}

resource "aws_ecr_repository" "jasmc-ecr-repo" {
  name = "jasmc-ecr-repo"
}
