from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Конфигурация приложения, загруженная из окружения."""

    database_url: str = "postgresql+asyncpg://root_user:secret@localhost:5433/tgshop"
    minio_endpoint: str = "http://localhost:9000"
    minio_access_key: str = "minioadmin"
    minio_secret_key: str = "minioadmin"
    minio_bucket: str = "tgshop"

    class Config:
        env_file = ".env"
        extra = "allow"  # или "ignore"

settings = Settings()
