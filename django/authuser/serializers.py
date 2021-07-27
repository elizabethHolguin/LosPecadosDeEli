from rest_framework import serializers

from .models import Client
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('userID', 'direction', 'city')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','is_superuser', 'username', 'first_name', 'last_name', 'email')

class UserSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class UserSerializerUpdate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')