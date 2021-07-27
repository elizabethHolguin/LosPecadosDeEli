from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from .models import News
from .models import Commentary

from .serializers import NewSerializer
from .serializers import CommentarySerializer

from rest_framework import permissions

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def commentary(request):
    if request.method == 'GET':
        commentaries = Commentary.objects.filter(userID=request.user.id)
        serializer = CommentarySerializer(commentaries, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def commentary_post(request):
    if request.method == 'POST':
        serializer = CommentarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)