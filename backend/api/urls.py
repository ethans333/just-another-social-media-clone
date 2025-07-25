from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeView, PostViewSet, UserViewSet, SignupView, CustomObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', SignupView.as_view()),
    path('token/', CustomObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('me/', MeView.as_view()),
]
