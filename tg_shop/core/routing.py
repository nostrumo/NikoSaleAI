"""Маршруты для WebSocket соединений."""

from django.urls import re_path

from .consumers import ChatConsumer, NotificationConsumer

# Паттерны URL для обработки websocket-подключений
websocket_urlpatterns = [
    re_path(r"^ws/chat/(?P<user_id>\w+)/$", ChatConsumer.as_asgi()),
    re_path(r"^ws/notifications/$", NotificationConsumer.as_asgi()),
]
