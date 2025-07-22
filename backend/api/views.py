from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import viewsets
from .models import User, Post, Comment
from .serializers import PostSerializer, UserSerializer, CommentSerializer


@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Lambda!"})


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comments.all().order_by('-created_at')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['get'])
    def posts(self, request, pk=None):
        user = self.get_object()
        posts = user.posts.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
