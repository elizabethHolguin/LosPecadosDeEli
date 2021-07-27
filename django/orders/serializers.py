from rest_framework import serializers

from .models import Order
from .models import Details

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderPendingSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='userID__userID__username')
    class Meta:
        model = Order
        fields = ('orderID', 'username', 'date', 'lat', 'lon', 'status')

class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'

class DetailsDateSerializer(serializers.ModelSerializer):
    product = serializers.ReadOnlyField(source='productID')
    maxquantity = serializers.IntegerField(read_only=True)
    class Meta:
        model = Details
        fields = ('product', 'maxquantity')

class DetailsMonthSerializer(serializers.ModelSerializer):
    date = serializers.ReadOnlyField(source='orderID__date')
    quantity = serializers.IntegerField(read_only=True)
    class Meta:
        model = Details
        fields = ('date', 'quantity')

class OrderWeekSerializer(serializers.ModelSerializer):
    num_orders = serializers.IntegerField(read_only=True)
    class Meta:
        model = Order
        fields = ('date', 'num_orders')