"""WSGI-приложение для проекта tg_shop."""

import os
from pathlib import Path

from dotenv import load_dotenv
from django.core.wsgi import get_wsgi_application

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tg_shop.settings')

application = get_wsgi_application()
