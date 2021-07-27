from django.shortcuts import render

from django.db.models import Sum
from django.db.models import Count

import datetime

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from .models import Order
from .models import Details

from .serializers import OrderSerializer
from .serializers import OrderPendingSerializer
from .serializers import DetailsSerializer
from .serializers import DetailsDateSerializer
from .serializers import DetailsMonthSerializer
from .serializers import OrderWeekSerializer

from rest_framework import permissions

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def order_post(request):
    if request.method == 'POST':
        orders = Order.objects.filter(status=False, userID=request.user.id)
        if len(orders) == 0:
            serializer = OrderSerializer(data={"userID": request.user.id, "lat": request.data["lat"], "lon": request.data["lon"]})
            if serializer.is_valid():
                serializer.save()
                #serializer.data.get('orderID')
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_502_BAD_GATEWAY)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def details_post(request):
    if request.method == 'POST':
        serializer = DetailsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAdminUser])
def details_per_date(request, pk):
    if request.method == 'GET':
        startdate = datetime.datetime.now()
        enddate = startdate - datetime.timedelta(days=int(pk))
        details = Details.objects.filter(orderID__date__range=[enddate, startdate]).values('productID').order_by('productID').annotate(maxquantity=Sum('quantity'))
        serializer = DetailsDateSerializer(details, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAdminUser])
def details_per_month(request):
    if request.method == 'GET':
        startdate = datetime.datetime.now()
        enddate = startdate + datetime.timedelta(days=-30)
        details = Details.objects.filter(orderID__date__range=[enddate, startdate]).values('orderID__date').order_by('orderID__date').annotate(quantity=Sum('quantity'))
        serializer = DetailsMonthSerializer(details, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        startdate = request.data['startdate']
        enddate = request.data['enddate']
        details = Details.objects.filter(orderID__date__range=[startdate, enddate]).values('productID').order_by('productID').annotate(maxquantity=Sum('quantity'))
        serializer = DetailsDateSerializer(details, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAdminUser])
def orders_per_week(request):
    if request.method == 'GET':
        startdate = datetime.datetime.now()
        enddate = startdate + datetime.timedelta(days=-7)
        orders = Order.objects.filter(date__range=[enddate, startdate]).values('date').order_by('date').annotate(num_orders=Count('orderID'))
        serializer = OrderWeekSerializer(orders, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAdminUser])
def orders_pending(request):
    if request.method == 'GET':
        orders = Order.objects.filter(status=False).values('userID__userID__username', 'orderID', 'date', 'lat', 'lon', 'status').order_by('date')
        serializer = OrderPendingSerializer(orders, many=True)
        return Response(serializer.data)

@api_view(['PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([permissions.IsAdminUser])
def orders_change_state(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PATCH':
        serializer = OrderSerializer(order, data={"userID": order.userID, "status": request.data["status"]})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
