from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterUserView,
    InviteManagerView,
    ManagerViewSet,
    GenerateInviteLinkView,
    RegisterViaTokenView, ConfirmInviteView, MarketplaceTokenViewSet, ProductViewSet, QuestionAnswerViewSet,
    ProductQuestionViewSet, ProductQuestionMessageViewSet, ExternalQuestionCreateView, UserConversationView,
    ShopUserListView
)

from rest_framework import permissions

router = DefaultRouter()
router.register(r'managers', ManagerViewSet, basename='manager')
router.register(r'questions', ProductQuestionViewSet, basename='questions')
router.register(r'messages', ProductQuestionMessageViewSet, basename='question-messages')
router.register(r'answers', QuestionAnswerViewSet, basename='answers')
router.register(r'products', ProductViewSet, basename='product')
router.register(
    r'stores/(?P<store_id>\d+)/marketplace-tokens',
    MarketplaceTokenViewSet,
    basename='marketplace-token'
)
urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('shop_users/', ShopUserListView.as_view(), name='shop_users'),
    path('conversations/', UserConversationView.as_view(), name='conversations'),
    path('owners/<int:store_id>/invite-manager/', InviteManagerView.as_view(), name='invite-manager'),
    path('owners/<int:store_id>/generate-invite/', GenerateInviteLinkView.as_view(), name='generate-invite'),
    path('invite/<uuid:token>/', RegisterViaTokenView.as_view(), name='register-via-token'),
    path('', include(router.urls)),
    path('external/questions/', ExternalQuestionCreateView.as_view(), name='external-question'),
    path('invite/<uuid:token>/confirm/', ConfirmInviteView.as_view(), name='invite-confirm'),
]
