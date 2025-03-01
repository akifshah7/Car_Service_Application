from rest_framework import serializers
from .models import Car, CarSelection

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class CarSelectionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # Automatically assign the user
    class Meta:
        model = CarSelection
        fields = ['id', 'user', 'car_brand', 'car_model', 'fuel_type', 'transmission']  # Ensure 'id' is listed

    def create(self, validated_data):
        car_selection = CarSelection.objects.create(**validated_data)
        return car_selection  # Ensure the created instance is returned with an ID
