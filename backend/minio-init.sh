#!/bin/sh
set -e

# Set MinIO alias (connects mc to the MinIO server)
mc alias set local http://minio:9000 minioadmin minioadmin

# Create the bucket (if not already exists)
mc mb --ignore-existing local/mybucket

# Make the bucket public
mc anonymous set download local/mybucket
