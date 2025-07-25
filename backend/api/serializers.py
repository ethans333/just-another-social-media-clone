from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Post, User, Comment
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(required=False, allow_blank=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password',
                  'profile_picture_url', 'bio', 'location']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.is_active = True
        user.save()
        return user

    def update(self, instance, validated_data):
        # Remove password to handle separately
        password = validated_data.pop('password', None)

        # Remove username if missing or blank to avoid overwrite with empty value
        if 'username' in validated_data and not validated_data['username']:
            validated_data.pop('username')

        instance = super().update(instance, validated_data)

        if password:
            instance.set_password(password)
            instance.save()

        return instance


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at',
                  'updated_at', 'image_url', 'likes', 'comment_count']

    def get_comment_count(self, obj):
        return obj.comments.count()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(username=username_or_email).first()
        username = user.username if user else username_or_email

        auth_user = authenticate(username=username, password=password)
        if not auth_user:
            raise serializers.ValidationError(
                "Invalid username or password"
            )

        data = super().validate({
            "username": username,
            "password": password
        })

        return data
