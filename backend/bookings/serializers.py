from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    appointment_date = serializers.ReadOnlyField()
    status = serializers.ReadOnlyField()
    car_brand = serializers.SerializerMethodField()
    car_model = serializers.SerializerMethodField()
    fuel_type = serializers.SerializerMethodField()
    transmission = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    service_type = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            'id',
            'user',
            'car_selection',
            'service_pack',
            'appointment_date',
            'status',
            'car_brand',
            'car_model',
            'fuel_type',
            'transmission',
            'price',
            'service_type',
        ]

    def get_car_brand(self, obj):
        # Returns the car brand from the related CarSelection record
        return getattr(obj.car_selection, 'car_brand', None)

    def get_car_model(self, obj):
        return getattr(obj.car_selection, 'car_model', None)

    def get_fuel_type(self, obj):
        return getattr(obj.car_selection, 'fuel_type', None)

    def get_transmission(self, obj):
        return getattr(obj.car_selection, 'transmission', None)
    
    def get_price(self, obj):
        # Returns the price of the service pack from the related ServiceSelection record
        return getattr(obj.service_pack, 'price', None)
    
    def get_service_type(self, obj):
        return getattr(obj.service_pack,'service_type', None)
