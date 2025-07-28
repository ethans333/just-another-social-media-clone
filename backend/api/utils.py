from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings


def upload_image(file_obj, s3_path: str) -> str:
    if not file_obj:
        raise ValueError("No file object provided")

    file_path = default_storage.save(
        f'{s3_path}/{file_obj.name}', ContentFile(file_obj.read()))
    file_url = default_storage.url(file_path)

    if settings.USE_MINIO:
        file_url = file_url.replace("minio", "localhost")

    return file_url
