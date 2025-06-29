"""Примитивное хранение вопросов о товарах."""

from typing import List
from uuid import uuid4

from pydantic import BaseModel


class ProductQuestion(BaseModel):
    """Модель вопроса."""

    id: str
    external_id: str
    product_id: int
    text: str
    marketplace: str | None = None


_questions: List[ProductQuestion] = []


def create_question(data: ProductQuestion) -> ProductQuestion:
    """Сохраняет вопрос в памяти."""
    _questions.append(data)
    return data


def list_questions() -> List[ProductQuestion]:
    """Возвращает все вопросы."""
    return _questions
