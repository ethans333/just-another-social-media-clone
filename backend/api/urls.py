from .views import hello
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, UserViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'users', UserViewSet)


urlpatterns = [
    path('hello/', hello),
    path('', include(router.urls)),
]
