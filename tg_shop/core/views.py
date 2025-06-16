from django.db import IntegrityError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .permissions import IsOwnerOrManager, IsAuthenticatedOrAPISecret
from .serializers import RegisterUserSerializer, MarketplaceTokenSerializer, ProductSerializer, \
    QuestionAnswerSerializer, ProductQuestionSerializer, ProductQuestionMessageSerializer, \
    QuestionWithMessagesSerializer

from rest_framework import generics, permissions
from .serializers import ManagerInviteSerializer
from .models import Store, CustomUser, ManagerInviteToken, MarketplaceIntegrationToken, ProductImage, Product, \
    QuestionAnswer, ProductQuestion, ProductQuestionMessage, Marketplace
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound

from .utils.utils import get_store_for_user


class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Регистрация прошла успешно', 'user_id': user.id}, status=201)
        return Response(serializer.errors, status=400)


class InviteManagerView(generics.CreateAPIView):
    serializer_class = ManagerInviteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def dispatch(self, request, *args, **kwargs):
        self.store_id = kwargs.get('store_id')
        return super().dispatch(request, *args, **kwargs)

    def get_store(self):
        try:
            store = Store.objects.get(id=self.store_id)
        except Store.DoesNotExist:
            raise NotFound('Магазин не найден')
        if store.owner != self.request.user:
            raise PermissionDenied('Вы не владелец этого магазина')
        return store

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['store'] = self.get_store()
        return context


from rest_framework import viewsets, permissions
from .serializers import ManagerSerializer
from .models import CustomUser, Store
from rest_framework.exceptions import PermissionDenied


class ManagerViewSet(viewsets.ModelViewSet):
    serializer_class = ManagerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != 'owner':
            raise PermissionDenied("Только владелец магазина может просматривать менеджеров.")
        return CustomUser.objects.filter(role='manager', store__owner=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role != 'owner':
            raise PermissionDenied("Только владелец может создавать менеджеров.")
        store = Store.objects.filter(owner=self.request.user).first()
        serializer.save(role='manager', store=store)

    def perform_update(self, serializer):
        if self.request.user.role != 'owner':
            raise PermissionDenied("Только владелец может редактировать менеджеров.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.role != 'owner':
            raise PermissionDenied("Только владелец может удалять менеджеров.")
        instance.delete()


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Store, ManagerInviteToken


class GenerateInviteLinkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, store_id):
        try:
            store = Store.objects.get(id=store_id)
        except Store.DoesNotExist:
            return Response({"error": "Store not found"}, status=404)

        if store.owner != request.user:
            raise PermissionDenied("Вы не владелец магазина")

        token = ManagerInviteToken.objects.create(store=store)
        link = f"http://localhost:8000/api/invite/{token.token}/"
        return Response({"invite_link": link})


from .serializers import InviteByTokenSerializer


class RegisterViaTokenView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, token):
        try:
            invite_token = ManagerInviteToken.objects.select_related('store').get(token=token, is_used=False)
        except ManagerInviteToken.DoesNotExist:
            return Response({"error": "Invalid or used token"}, status=status.HTTP_400_BAD_REQUEST)

        is_expired = invite_token.is_expired()

        return Response({
            "store_id": invite_token.store.id,
            "store_name": invite_token.store.name,
            "token_valid": not is_expired,
            "is_expired": is_expired,
            "token": str(invite_token.token)
        }, status=status.HTTP_200_OK if not is_expired else status.HTTP_400_BAD_REQUEST)

    def post(self, request, token):
        try:
            invite_token = ManagerInviteToken.objects.get(token=token)
        except ManagerInviteToken.DoesNotExist:
            return Response({"error": "Invalid token"}, status=404)

        # 🔒 Авторизация и проверка владельца
        if not request.user.is_authenticated:
            raise PermissionDenied("Требуется авторизация")

        if not hasattr(request.user, "role") or request.user.role != 'owner':
            raise PermissionDenied("Только владелец магазина может использовать этот токен")

        if invite_token.store.owner != request.user:
            raise PermissionDenied("Вы не владелец магазина, связанного с этим токеном")

        if invite_token.is_used:
            return Response({"error": "Token already used"}, status=400)

        if invite_token.is_expired():
            return Response({"error": "Token expired"}, status=410)

        serializer = InviteByTokenSerializer(data=request.data, context={'invite_token': invite_token})
        if serializer.is_valid():
            user = serializer.save()
            invite_token.is_used = True
            invite_token.save(update_fields=['is_used'])
            return Response({"message": "Менеджер зарегистрирован", "user_id": user.id}, status=201)

        return Response(serializer.errors, status=400)


class ConfirmInviteView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            invite_token = ManagerInviteToken.objects.get(token=token)
        except ManagerInviteToken.DoesNotExist:
            raise NotFound("Токен не найден")

        if invite_token.is_used:
            return Response({"error": "Токен уже использован"}, status=400)

        if invite_token.is_expired():
            return Response({"error": "Срок действия токена истёк"}, status=410)

        if request.user.role != 'owner':
            raise PermissionDenied("Только владелец магазина может подтвердить регистрацию")

        if invite_token.store.owner != request.user:
            raise PermissionDenied("Этот токен принадлежит другому магазину")

        return Response({
            "store": invite_token.store.name,
            "token": str(invite_token.token),
            "can_register": True
        }, status=200)


from rest_framework import serializers


class MarketplaceTokenViewSet(viewsets.ModelViewSet):
    serializer_class = MarketplaceTokenSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'service_name'

    def get_queryset(self):
        store_id = self.kwargs['store_id']
        store = Store.objects.get(pk=store_id)
        if store.owner != self.request.user:
            raise PermissionDenied('Вы не владелец этого магазина')
        return MarketplaceIntegrationToken.objects.filter(store=store)

    def perform_create(self, serializer):
        store_id = self.kwargs['store_id']
        store = Store.objects.get(pk=store_id)
        if store.owner != self.request.user:
            raise PermissionDenied('Вы не владелец этого магазина')
        try:
            serializer.save(store=store)
        except IntegrityError:
            raise serializers.ValidationError({
                "service_name": f"Токен для {serializer.validated_data.get('service_name')} уже существует для этого магазина."
            })


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrManager]
    parser_classes = [MultiPartParser, FormParser]

    def get_store(self):
        user = self.request.user
        if user.role == 'owner':
            store = Store.objects.filter(owner=user).first()
        elif user.role == 'manager':
            store = user.store
        else:
            store = None

        if not store:
            raise PermissionDenied("Вы не привязаны к магазину.")
        return store

    def get_queryset(self):
        return Product.objects.filter(store=self.get_store())

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['store'] = self.get_store()
        return context


from rest_framework.decorators import action


class QuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['owner', 'manager']:
            return QuestionAnswer.objects.filter(responder=user)
        return QuestionAnswer.objects.none()

    @action(detail=False, methods=['get'], url_path='by-user/(?P<user_id>[^/.]+)')
    def answers_by_user(self, request, user_id=None):
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        questions = ProductQuestion.objects.filter(user=user).values_list('id', flat=True)
        answers = QuestionAnswer.objects.filter(question_id__in=questions)
        serializer = self.get_serializer(answers, many=True)
        return Response(serializer.data)

class ProductQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = ProductQuestionSerializer
    queryset = ProductQuestion.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'user':
            return ProductQuestion.objects.filter(user=user)
        elif user.role in ['manager', 'owner']:
            return ProductQuestion.objects.all()
        return ProductQuestion.objects.none()



class ProductQuestionMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ProductQuestionMessageSerializer
    queryset = ProductQuestionMessage.objects.all()
    permission_classes = [IsAuthenticatedOrAPISecret]  # ✅ Только один permission

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role in ['manager', 'owner']:
            return ProductQuestionMessage.objects.all()
        return ProductQuestionMessage.objects.none()


class ExternalQuestionCreateView(APIView):
    permission_classes = [IsAuthenticatedOrAPISecret]  # публично, но по ключу

    def post(self, request):

        external_id = request.data.get('external_id')
        product_id = request.data.get('product')
        text = request.data.get('text')
        marketplace_name = request.data.get('marketplace')

        if not all([external_id, product_id, text]):
            return Response({'error': 'Missing required fields'}, status=400)

        user, _ = CustomUser.objects.get_or_create(
            external_id=external_id,
            defaults={
                'username': f"user_{external_id[:12]}",
                'role': 'user'
            }
        )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        marketplace = Marketplace.objects.filter(name=marketplace_name).first()

        question = ProductQuestion.objects.create(
            product=product,
            user=user,
            text=text,
            marketplace=marketplace
        )

        return Response({'message': 'Question submitted', 'question_id': question.id}, status=201)


class UserConversationView(APIView):
    def get(self, request):
        external_id = request.query_params.get("external_id")
        if not external_id:
            return Response({"error": "external_id is required"}, status=400)

        try:
            user = CustomUser.objects.get(external_id=external_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "user not found"}, status=404)

        questions = ProductQuestion.objects.filter(user=user).order_by("-created_at")
        data = QuestionWithMessagesSerializer(questions, many=True).data
        return Response(data)

class ShopUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        store = get_store_for_user(request.user)
        if not store:
            return Response({"error": "Магазин не найден у пользователя"}, status=403)

        # Все товары магазина
        products = Product.objects.filter(shop=store)
        if not products.exists():
            return Response({"users": []})

        # Вопросы по товарам
        questions = ProductQuestion.objects.filter(product__in=products).select_related("user").prefetch_related("messages")

        result = {}

        for question in questions:
            user = question.user
            if user is None:
                continue

            uid = user.external_id or f"user_{user.id}"
            sent_at_list = list(question.messages.values_list("sent_at", flat=True))
            if not sent_at_list:
                continue

            first = min(sent_at_list)
            last = max(sent_at_list)

            if uid not in result:
                result[uid] = {
                    "external_id": uid,
                    "first_message": first,
                    "last_message": last,
                }
            else:
                result[uid]["first_message"] = min(result[uid]["first_message"], first)
                result[uid]["last_message"] = max(result[uid]["last_message"], last)

        sorted_users = sorted(result.values(), key=lambda x: x["first_message"])
        return Response(sorted_users)

