terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
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

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

resource "aws_ecr_repository" "jasmc-ecr-frontend-repo" {
  name = "jasmc-ecr-frontend-repo"

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

resource "aws_ecr_repository" "jasmc-ecr-backend-repo" {
  name = "jasmc-ecr-backend-repo"

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "eks-vpc"
  cidr   = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

module "eks" {
  source             = "terraform-aws-modules/eks/aws"
  version            = "~> 21.0"
  name               = var.cluster_name
  kubernetes_version = "1.33"

  endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    default_node_group = {
      min_size     = 2
      max_size     = 10
      desired_size = 2

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}
