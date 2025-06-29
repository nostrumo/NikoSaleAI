"""Маршруты для WebSocket соединений."""

from django.urls import re_path

from .consumers import ChatConsumer

# Паттерны URL для обработки websocket-подключений
websocket_urlpatterns = [
    re_path(r"^ws/chat/(?P<user_id>\w+)/$", ChatConsumer.as_asgi()),
]
