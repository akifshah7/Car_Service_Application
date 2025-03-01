import logging
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ServiceSelection
from .serializers import ServiceSelectionSerializer

logger = logging.getLogger(__name__)

class ServiceSelectionCreateView(generics.CreateAPIView):
    queryset = ServiceSelection.objects.all()
    serializer_class = ServiceSelectionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.info(
            "Creating service selection for user %s with data: %s",
            self.request.user,
            serializer.validated_data,
        )
        serializer.save(user=self.request.user)
        logger.info("Service selection created successfully for user %s", self.request.user)


class ServiceSelectionListView(generics.ListAPIView):
    queryset = ServiceSelection.objects.all()
    serializer_class = ServiceSelectionSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        logger.info("Received GET request for service selections.")
        response = super().list(request, *args, **kwargs)
        logger.debug("Returning service selection list: %s", response.data)
        return response
