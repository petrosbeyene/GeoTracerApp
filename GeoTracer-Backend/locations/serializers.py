from rest_framework import serializers
from .models import GeoData

class GeoDataSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField
    class Meta:
        model = GeoData
        fields = '__all__'
        read_only_fields = ('user',)