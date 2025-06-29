from typing import Iterable
from uuid import uuid4
from urllib.parse import urlparse

from minio import Minio

from .config import settings

class MinioStorage:
    """Класс для загрузки файлов в MinIO."""

    def __init__(self) -> None:
        parsed = urlparse(settings.minio_endpoint)
        self.client = Minio(
            endpoint=f"{parsed.hostname}:{parsed.port}" if parsed.port else parsed.hostname,
            access_key=settings.minio_access_key,
            secret_key=settings.minio_secret_key,
            secure=parsed.scheme == "https",
        )
        self.bucket = settings.minio_bucket
        if not self.client.bucket_exists(self.bucket):
            self.client.make_bucket(self.bucket)

    def upload_files(self, files: Iterable[bytes]) -> list[str]:
        """Сохраняет файлы и возвращает их ключи."""
        keys = []
        for file_data in files:
            key = f"{uuid4().hex}"
            self.client.put_object(
                bucket_name=self.bucket,
                object_name=key,
                data=file_data,
                length=len(file_data),
                content_type="application/octet-stream",
            )
            keys.append(key)
        return keys
