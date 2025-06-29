"""Утилита для управления WebSocket-подключениями."""

from typing import Set
from fastapi import WebSocket


class WebSocketManager:
    """Простой менеджер подключений."""

    def __init__(self) -> None:
        self.active_connections: Set[WebSocket] = set()

    async def connect(self, websocket: WebSocket) -> None:
        """Подключение клиента."""
        await websocket.accept()
        self.active_connections.add(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        """Отключение клиента."""
        self.active_connections.discard(websocket)

    async def broadcast(self, message: str) -> None:
        """Отправляет сообщение всем подключённым клиентам."""
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message)
            except Exception:
                self.disconnect(connection)
