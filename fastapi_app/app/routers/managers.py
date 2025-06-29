from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from .. import schemas, crud
from ..database import get_session

router = APIRouter(prefix="/api/managers", tags=["managers"])

@router.post("/", response_model=schemas.ManagerRead)
async def create_manager(data: schemas.ManagerCreate, session: AsyncSession = Depends(get_session)):
    """Создание нового менеджера."""
    return await crud.ManagerCRUD.create(session, data)

@router.get("/", response_model=list[schemas.ManagerRead])
async def list_managers(session: AsyncSession = Depends(get_session)):
    """Возвращает список менеджеров."""
    return await crud.ManagerCRUD.get_list(session)

@router.get("/{manager_id}", response_model=schemas.ManagerRead)
async def get_manager(manager_id: int, session: AsyncSession = Depends(get_session)):
    """Получить менеджера по идентификатору."""
    manager = await crud.ManagerCRUD.get(session, manager_id)
    if not manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return manager

@router.delete("/{manager_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_manager(manager_id: int, session: AsyncSession = Depends(get_session)):
    """Удалить менеджера."""
    await crud.ManagerCRUD.delete(session, manager_id)
