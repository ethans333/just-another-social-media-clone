import os
from storages.backends.s3boto3 import S3Boto3Storage


class LocalStackStorage(S3Boto3Storage):
    bucket_name = os.getenv("AWS_STORAGE_BUCKET_NAME")
    endpoint_url = os.getenv("AWS_S3_ENDPOINT_URL")
    custom_domain = False
