from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .. import schemas, crud
from ..database import get_session

router = APIRouter(tags=["conversations"])

@router.post("/api/external/questions/", response_model=schemas.ConversationMessageRead)
async def ask_question(data: schemas.ConversationMessageCreate, session: AsyncSession = Depends(get_session)):
    """Пользователь задаёт вопрос."""
    return await crud.ConversationCRUD.add_message(session, data)

@router.get("/api/conversations/")
async def get_conversation(external_id: str, session: AsyncSession = Depends(get_session)):
    """Получить переписку по external_id."""
    return await crud.ConversationCRUD.get_by_external_id(session, external_id)
