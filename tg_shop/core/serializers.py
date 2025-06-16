from django.utils.crypto import get_random_string
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# --- Регистрация владельца и менеджера ---
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Store, MarketplaceIntegrationToken, ProductImage, Product, Marketplace, QuestionAnswer, \
    ProductQuestion, ProductQuestionMessage, CustomUser

User = get_user_model()

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    store_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'role', 'telegram_id',
            'contact_phone', 'password', 'password_confirm', 'store_name'
        ]

    def validate(self, attrs):
        if attrs.get('role') != 'owner':
            raise serializers.ValidationError("Регистрация через этот эндпоинт доступна только владельцам магазинов.")
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают.")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password_confirm')
        store_name = validated_data.pop('store_name')

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        Store.objects.create(name=store_name, owner=user)
        return user

# --- Приглашение менеджера владельцем ---
class ManagerInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'telegram_id', 'contact_phone']

    def create(self, validated_data):
        validated_data['role'] = 'manager'
        validated_data['store'] = self.context['store']
        user = User.objects.create_user(**validated_data)
        return user

# --- CRUD для менеджеров ---
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'telegram_id', 'contact_phone', 'store']
        read_only_fields = ['id', 'store']

class InviteByTokenSerializer(serializers.ModelSerializer):
    generated_password = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'telegram_id', 'contact_phone', 'generated_password']

    def get_generated_password(self, obj):
        return obj._plain_password if hasattr(obj, '_plain_password') else None

    def create(self, validated_data):
        token = self.context['invite_token']
        password = get_random_string(12)

        user = User(
            **validated_data,
            role='manager',
            store=token.store
        )
        user.set_password(password)
        user._plain_password = password  # временно сохранить для get_generated_password
        user.save()

        token.is_used = True
        token.save()
        return user

class MarketplaceTokenSerializer(serializers.ModelSerializer):
    token = serializers.CharField(write_only=True)
    token_preview = serializers.SerializerMethodField(read_only=True)
    marketplace = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Marketplace.objects.all()
    )

    class Meta:
        model = MarketplaceIntegrationToken
        fields = ['id', 'marketplace', 'token', 'token_preview', 'created_at']
        read_only_fields = ['id', 'created_at', 'token_preview']

    def create(self, validated_data):
        token = validated_data.pop('token')
        instance = MarketplaceIntegrationToken(**validated_data)
        instance.set_token(token)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        token = validated_data.pop('token', None)
        instance = super().update(instance, validated_data)
        if token:
            instance.set_token(token)
            instance.save()
        return instance

    def get_token_preview(self, obj):
        try:
            token = obj.get_token()
            if len(token) <= 8:
                return '*' * len(token)
            return f"{token[:4]}{'*' * (len(token)-8)}{token[-4:]}"
        except Exception:
            return "********"
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'caption']
        read_only_fields = ['id']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False, read_only=True)
    marketplaces = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Marketplace.objects.all()
    )

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'specifications', 'marketplaces', 'images']
        read_only_fields = ['id']

    def create(self, validated_data):
        # забираем данные из context
        store = self.context['store']
        user = self.context['request'].user

        # очищаем от возможных дублирующихся полей
        validated_data.pop('store', None)
        validated_data.pop('created_by', None)

        marketplaces = validated_data.pop('marketplaces', [])
        product = Product.objects.create(store=store, created_by=user, **validated_data)
        product.marketplaces.set(marketplaces)

        # обработка изображений (multipart)
        images = self.context['request'].FILES.getlist('images')
        for image in images:
            ProductImage.objects.create(product=product, image=image)

        return product

    def update(self, instance, validated_data):
        marketplaces = validated_data.pop('marketplaces', None)
        if marketplaces is not None:
            instance.marketplaces.set(marketplaces)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class QuestionAnswerSerializer(serializers.ModelSerializer):
    responder_role = serializers.SerializerMethodField()
    marketplace = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = QuestionAnswer
        fields = ['id', 'question', 'responder', 'responder_role', 'text', 'sent_at', 'role', 'marketplace']
        read_only_fields = ['id', 'sent_at', 'responder', 'marketplace', 'role']

    def get_responder_role(self, obj):
        return obj.responder.role if obj.responder else obj.role

    def get_marketplace(self, obj):
        return obj.marketplace.name if obj.marketplace else None

    def create(self, validated_data):
        user = self.context['request'].user
        question = validated_data['question']

        validated_data['responder'] = user
        validated_data['marketplace'] = question.marketplace

        # автоматически установить роль на основании request.user
        if user and user.is_authenticated:
            validated_data['role'] = user.role
        else:
            validated_data['role'] = 'ai'  # если не человек, можно передавать "ai"

        return super().create(validated_data)

class ProductQuestionSerializer(serializers.ModelSerializer):
    marketplace = serializers.SlugRelatedField(
        queryset=Marketplace.objects.all(),
        slug_field='name',
        required=False,
        allow_null=True
    )

    class Meta:
        model = ProductQuestion
        fields = ['id', 'product', 'text', 'marketplace', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'role']

class QuestionMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = ProductQuestionMessage
        fields = ['id', 'text', 'role', 'sender', 'sent_at']

class QuestionWithMessagesSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()
    marketplace = serializers.SerializerMethodField()

    class Meta:
        model = ProductQuestion
        fields = ['id', 'text', 'product', 'marketplace', 'created_at', 'messages']

    def get_product(self, obj):
        return {
            "id": obj.product.id,
            "name": obj.product.title
        }

    def get_marketplace(self, obj):
        return obj.marketplace.name if obj.marketplace else None

    def get_messages(self, obj):
        messages = ProductQuestionMessage.objects.filter(question=obj).order_by("sent_at")
        return QuestionMessageSerializer(messages, many=True).data

class ProductQuestionMessageSerializer(serializers.ModelSerializer):
    marketplace = serializers.SerializerMethodField(read_only=True)
    sender_role = serializers.SerializerMethodField()

    class Meta:
        model = ProductQuestionMessage
        fields = ['id', 'question', 'text', 'sender', 'sender_role', 'role', 'marketplace', 'sent_at', 'parent']
        read_only_fields = ['id', 'sent_at', 'sender', 'role', 'marketplace']

    def get_marketplace(self, obj):
        return obj.marketplace.name if obj.marketplace else None

    def get_sender_role(self, obj):
        return obj.role

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        question = validated_data['question']
        validated_data['marketplace'] = question.marketplace

        if user and user.is_authenticated:
            validated_data['sender'] = user
            validated_data['role'] = user.role
        else:
            validated_data['sender'] = None
            validated_data['role'] = 'ai'

        return super().create(validated_data)

class ProductListSerializer(serializers.ModelSerializer):
    marketplaces = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='name'
    )
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "title", "description", "characteristics",
            "marketplaces", "images", "created_at"
        ]

    def get_images(self, obj):
        return [img.image.url for img in obj.images.all()]



