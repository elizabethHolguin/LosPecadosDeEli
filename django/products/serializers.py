from rest_framework import serializers

from .models import Category
from .models import Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('categoryID', 'categoryname')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('productID', 'categoryID', 'name')
