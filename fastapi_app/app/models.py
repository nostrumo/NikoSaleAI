from __future__ import annotations

from sqlalchemy import Column, Integer, String, JSON, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship

from .database import Base

class Manager(Base):
    """Модель менеджера магазина."""

    __tablename__ = "managers"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(128), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telegram_id = Column(Integer, nullable=True)
    contact_phone = Column(String(32), nullable=True)

class MarketplaceToken(Base):
    """Токен для интеграции с маркетплейсом."""

    __tablename__ = "marketplace_tokens"

    id = Column(Integer, primary_key=True, index=True)
    store_id = Column(Integer, nullable=False)
    service_name = Column(String(64), nullable=False)
    token = Column(String(512), nullable=False)

class Product(Base):
    """Продукт магазина."""

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    specifications = Column(JSON, nullable=True)
    marketplaces = Column(JSON, nullable=True)
    image_keys = Column(JSON, nullable=True)

class ConversationMessage(Base):
    """Сообщение в переписке пользователя с менеджером."""

    __tablename__ = "conversation_messages"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String(64), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    text = Column(Text, nullable=False)
    marketplace = Column(String(64), nullable=False)
    from_manager = Column(Boolean, default=False, nullable=False)

    product = relationship("Product")
