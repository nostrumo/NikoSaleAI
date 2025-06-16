from django.core.management.base import BaseCommand
from core.models import Marketplace

DEFAULT_MARKETPLACES = [
    "Ozon",
    "Wildberries",
    "Yandex.Market",
    "SberMegaMarket",
    "AliExpress",
]

class Command(BaseCommand):
    help = "Создаёт дефолтные маркетплейсы"

    def handle(self, *args, **kwargs):
        for name in DEFAULT_MARKETPLACES:
            obj, created = Marketplace.objects.get_or_create(name=name)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Добавлен: {name}"))
            else:
                self.stdout.write(f"Уже существует: {name}")
