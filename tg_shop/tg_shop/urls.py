from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Marketplace API",
        default_version='v1',
        description="Управление магазинами, товарами, вопросами и менеджерами",
        contact=openapi.Contact(email="support@example.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 👇 Добавь Swagger сюда!
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger.yaml', schema_view.without_ui(cache_timeout=0), name='schema-yaml'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Шаблон для автодокументирования всех методов ModelViewSet
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

def generate_viewset_with_docs(viewset_class, serializer_class, model_name):
    class AutoDocViewSet(viewset_class):
        @swagger_auto_schema(operation_description=f"Получить список {model_name}")
        def list(self, request, *args, **kwargs):
            return super().list(request, *args, **kwargs)

        @swagger_auto_schema(operation_description=f"Создать {model_name}", request_body=serializer_class)
        def create(self, request, *args, **kwargs):
            return super().create(request, *args, **kwargs)

        @swagger_auto_schema(operation_description=f"Получить {model_name} по ID")
        def retrieve(self, request, *args, **kwargs):
            return super().retrieve(request, *args, **kwargs)

        @swagger_auto_schema(operation_description=f"Обновить {model_name} целиком", request_body=serializer_class)
        def update(self, request, *args, **kwargs):
            return super().update(request, *args, **kwargs)

        @swagger_auto_schema(operation_description=f"Частично обновить {model_name}", request_body=serializer_class)
        def partial_update(self, request, *args, **kwargs):
            return super().partial_update(request, *args, **kwargs)

        @swagger_auto_schema(operation_description=f"Удалить {model_name}")
        def destroy(self, request, *args, **kwargs):
            return super().destroy(request, *args, **kwargs)

    return AutoDocViewSet