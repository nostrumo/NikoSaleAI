from typing import Optional, List, Any
from pydantic import BaseModel, Field

class ManagerCreate(BaseModel):
    """Схема создания менеджера."""

    username: str
    email: str
    telegram_id: Optional[int] = None
    contact_phone: Optional[str] = None

class ManagerRead(ManagerCreate):
    id: int

    class Config:
        orm_mode = True

class MarketplaceTokenCreate(BaseModel):
    """Схема создания токена маркетплейса."""

    store_id: int
    service_name: str
    token: str

class MarketplaceTokenRead(MarketplaceTokenCreate):
    id: int

    class Config:
        orm_mode = True

class ProductCreate(BaseModel):
    """Схема создания продукта."""

    title: str
    description: Optional[str] = None
    specifications: Optional[Any] = None
    marketplaces: Optional[List[str]] = Field(default_factory=list)

class ProductRead(ProductCreate):
    id: int
    image_keys: List[str] = Field(default_factory=list)

    class Config:
        orm_mode = True

class ConversationMessageCreate(BaseModel):
    """Схема входящего сообщения."""

    external_id: str
    product: int
    text: str
    marketplace: str
    from_manager: bool = False

class ConversationMessageRead(ConversationMessageCreate):
    id: int

    class Config:
        orm_mode = True
