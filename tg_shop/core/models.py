import uuid
from datetime import timedelta

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

from .utils.crypto import encrypt_token, decrypt_token


# ────────────────────────────────────────
# Роли
# ────────────────────────────────────────
class Role(models.TextChoices):
    USER = 'user', 'Пользователь'
    MANAGER = 'manager', 'Менеджер'
    OWNER = 'owner', 'Владелец магазина'


# ────────────────────────────────────────
# Магазин
# ────────────────────────────────────────
class Store(models.Model):
    name = models.CharField(max_length=255)
    store_code = models.CharField(max_length=64, unique=True, blank=True)
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_stores',
                                 null=True,
                                 blank=True,
                                 )

    def save(self, *args, **kwargs):
        if not self.store_code:
            self.store_code = f"{uuid.uuid4()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.store_code})"


# ────────────────────────────────────────
# Кастомный пользователь
# ────────────────────────────────────────
class CustomUser(AbstractUser):
    external_id = models.CharField(max_length=128, unique=True, null=True, blank=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    telegram_id = models.BigIntegerField(unique=True, null=True, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)

    # Привязка к магазину (только для менеджеров)
    store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True, blank=True, related_name='managers')

    def is_owner(self):
        return self.role == Role.OWNER

    def is_manager(self):
        return self.role == Role.MANAGER

    @property
    def shop(self):
        if self.is_manager():
            return self.store
        elif self.is_owner() and hasattr(self, 'owned_store'):
            return self.owned_store
        return None


class Marketplace(models.Model):
    name = models.CharField(max_length=100, choices=[
        ('ozon', 'Ozon'),
        ('wildberries', 'Wildberries'),
        ('yandex_market', 'Яндекс.Маркет'),
    ])

    def __str__(self):
        return self.name


# ────────────────────────────────────────
# Товар
# ────────────────────────────────────────
class Product(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=255)
    description = models.TextField()
    specifications = models.JSONField(default=dict)  # {'weight': '1kg', 'color': 'black'}
    marketplaces = models.ManyToManyField(Marketplace, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.title} ({self.store.name})"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    caption = models.CharField(max_length=255, blank=True)


# ────────────────────────────────────────
# Отзыв
# ────────────────────────────────────────
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    rating = models.PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)


# ────────────────────────────────────────
# Приглашение менеджера
# ────────────────────────────────────────
class ManagerInviteToken(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='invite_tokens')
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return self.created_at < timezone.now() - timedelta(days=7)  # срок действия 7 дней

    def __str__(self):
        return f"Token for {self.store.name}"


# ────────────────────────────────────────
# Игтеграция с маркетплейсом
# ────────────────────────────────────────
class MarketplaceIntegrationToken(models.Model):
    store = models.ForeignKey('Store', on_delete=models.CASCADE, related_name='api_tokens')
    marketplace = models.ForeignKey('Marketplace', on_delete=models.CASCADE)
    _token = models.TextField(db_column='token')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('store', 'marketplace')  # Один токен на магазин + маркетплейс

    def set_token(self, raw_token):
        self._token = encrypt_token(raw_token)

    def get_token(self):
        return decrypt_token(self._token)

    def __str__(self):
        return f"{self.store.name} → {self.marketplace.name}"


class ProductQuestion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='questions')
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    text = models.TextField()
    marketplace = models.ForeignKey(Marketplace, on_delete=models.SET_NULL, null=True, blank=True)
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class QuestionAnswer(models.Model):
    question = models.ForeignKey(ProductQuestion, on_delete=models.CASCADE, related_name='answers')
    responder = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=16, choices=[
        ('manager', 'Менеджер'),
        ('owner', 'Владелец'),
        ('ai', 'ИИ'),
    ])
    marketplace = models.ForeignKey(Marketplace, on_delete=models.SET_NULL, null=True, blank=True)


class ProductQuestionMessage(models.Model):
    question = models.ForeignKey(ProductQuestion, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=16, choices=[
        ('user', 'Пользователь'),
        ('manager', 'Менеджер'),
        ('owner', 'Владелец'),
        ('ai', 'ИИ'),
    ])
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='replies')
    marketplace = models.ForeignKey(Marketplace, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.role} ({self.sender}): {self.text[:30]}"
