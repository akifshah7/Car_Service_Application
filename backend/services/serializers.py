from rest_framework import serializers
from .models import ServiceSelection

class ServiceSelectionSerializer(serializers.ModelSerializer):
    # Automatically assign the logged-in user, so make it read-only.
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = ServiceSelection
        fields = ["id", "user", "service_type", "price", "created_at"]
