"""Набор WebSocket-потребителей для чата."""

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    """WebSocket-консюмер для обмена сообщениями между пользователями."""

    async def connect(self) -> None:
        """Подключает пользователя к группе его чата."""
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.room_group_name = f"chat_{self.user_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code: int) -> None:
        """Отсоединяет пользователя от группы при закрытии соединения."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data: str) -> None:
        """Получает сообщение и пересылает его адресату."""
        data = json.loads(text_data)
        to_user = data["to"]
        message = data["message"]

        await self.channel_layer.group_send(
            f"chat_{to_user}",
            {
                "type": "chat_message",
                "from": self.user_id,
                "message": message,
            }
        )

    async def chat_message(self, event: dict) -> None:
        """Отправляет полученное событие клиенту."""
        await self.send(
            text_data=json.dumps({
                "from": event["from"],
                "message": event["message"],
            })
        )


class NotificationConsumer(AsyncWebsocketConsumer):
    """WebSocket-консюмер для уведомлений."""

    async def connect(self) -> None:
        """Подключает клиента к общей группе уведомлений."""
        await self.channel_layer.group_add("notifications", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code: int) -> None:
        """Отключает клиента от группы уведомлений."""
        await self.channel_layer.group_discard("notifications", self.channel_name)

    async def notify(self, event: dict) -> None:
        """Отправляет событие уведомления пользователю."""
        await self.send(text_data=json.dumps({"message": event["message"]}))
