"""Вспомогательные зависимости для FastAPI."""

from fastapi import Header, HTTPException, status
from pydantic import BaseModel


class ApiSecret(BaseModel):
    secret: str


async def verify_api_secret(x_api_secret: str | None = Header(default=None)) -> None:
    """Проверяет заголовок `X-API-SECRET`."""
    from os import getenv

    expected = getenv("EXTERNAL_API_SECRET")
    if not x_api_secret or x_api_secret != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API secret")
