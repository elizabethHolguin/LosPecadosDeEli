from django.shortcuts import render

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import permissions

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Client
from .models import Employee
from .models import Rol

from .serializers import ClientSerializer
from .serializers import UserSerializer
from .serializers import UserSerializerCreate
from .serializers import UserSerializerUpdate

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        try:
            user.auth_token.delete()
        except:
            print("New user create")
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

@api_view(['POST'])
def user_create(request):
    if request.method == 'POST':
        serializer = UserSerializerCreate(data=request.data)
        if serializer.is_valid():
            User.objects.create_user(
                serializer.initial_data['username'],
                serializer.initial_data['email'],
                serializer.initial_data['password']
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def user_data(request):
    user = request.user
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializerUpdate(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def client_create(request):
    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def client_data(request):

    try:
        client = Client.objects.get(pk=request.user.id)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)