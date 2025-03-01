import logging
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CarSelection
from .serializers import CarSelectionSerializer

# Set up a logger for this module
logger = logging.getLogger(__name__)

class CarSelectionListView(generics.ListAPIView):
    queryset = CarSelection.objects.all()
    serializer_class = CarSelectionSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        logger.info("Received GET request for car selections.")
        response = super().list(request, *args, **kwargs)
        logger.debug("Returning car selection list: %s", response.data)
        return response

class CarSelectionCreateView(generics.CreateAPIView):
    queryset = CarSelection.objects.all()
    serializer_class = CarSelectionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.info("Received POST request for car selection with data: %s", self.request.data)
        

        serializer.save(user=self.request.user)  # Assign logged-in user
        
        # Save car brand, model, fuel type, and transmission directly
        logger.info("Car selection created successfully for user: %s", self.request.user)
