"""Запуск FastAPI-приложения с поддержкой WebSocket."""

from uuid import uuid4

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from pydantic import BaseModel

from .websocket_manager import WebSocketManager
from .dependencies import verify_api_secret


app = FastAPI(title="NikoSale API")
manager = WebSocketManager()


class NotifyMessage(BaseModel):
    """Модель сообщения для отправки уведомлений."""

    message: str


@app.post("/notify", dependencies=[Depends(verify_api_secret)])
async def notify(message: NotifyMessage) -> dict:
    """Рассылает уведомление всем подключённым клиентам."""
    await manager.broadcast(message.message)
    return {"status": "ok"}


@app.websocket("/ws/notifications")
async def websocket_notifications(websocket: WebSocket) -> None:
    """Подключение для получения уведомлений в реальном времени."""
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # поддерживаем соединение
    except WebSocketDisconnect:
        manager.disconnect(websocket)

from .questions import ProductQuestion, create_question, list_questions

class QuestionIn(BaseModel):
    external_id: str
    product_id: int
    text: str
    marketplace: str | None = None


@app.post("/external/questions", dependencies=[Depends(verify_api_secret)])
async def external_question(question: QuestionIn) -> ProductQuestion:
    """Создаёт вопрос от внешней системы."""
    q = ProductQuestion(id=str(uuid4()), **question.dict())
    return create_question(q)


@app.get("/external/questions", response_model=list[ProductQuestion], dependencies=[Depends(verify_api_secret)])
async def external_question_list() -> list[ProductQuestion]:
    """Список отправленных вопросов."""
    return list_questions()

