from rest_framework import serializers

from .models import News
from .models import Commentary

class NewSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class CommentarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentary
        fields = '__all__'