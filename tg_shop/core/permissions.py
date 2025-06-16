from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.conf import settings

class IsOwnerOrManager(BasePermission):
    """
    Только владельцы магазинов и менеджеры могут использовать методы, кроме чтения.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True  # GET, HEAD, OPTIONS доступны всем
        return request.user.is_authenticated and request.user.role in ['manager', 'owner']

class IsStoreOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsAuthenticatedOrAPISecret(BasePermission):
    """
    Доступ разрешён, если:
    - пользователь авторизован, ИЛИ
    - X-API-SECRET равен системному значению
    """

    def has_permission(self, request, view):
        # Авторизация через JWT/сессию
        if request.user and request.user.is_authenticated:
            return True

        # Альтернатива — секретный ключ
        api_key = request.headers.get("X-API-SECRET")
        return api_key == settings.EXTERNAL_API_SECRET
