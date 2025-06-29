from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .. import schemas, crud
from ..database import get_session

router = APIRouter(prefix="/api/stores/{store_id}/marketplace-tokens", tags=["tokens"])

@router.post("/")
async def add_token(store_id: int, data: schemas.MarketplaceTokenCreate, session: AsyncSession = Depends(get_session)):
    """Добавить токен маркетплейса."""
    token = schemas.MarketplaceTokenCreate(**data.dict(), store_id=store_id)
    return await crud.TokenCRUD.add(session, token)

@router.delete("/{service_name}")
async def delete_token(store_id: int, service_name: str, session: AsyncSession = Depends(get_session)):
    """Удалить токен."""
    await crud.TokenCRUD.delete(session, store_id, service_name)
    return {"status": "deleted"}

@router.get("/")
async def list_tokens(store_id: int, session: AsyncSession = Depends(get_session)):
    """Список токенов магазина."""
    return await crud.TokenCRUD.list(session, store_id)
