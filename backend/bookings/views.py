import logging
from datetime import date, timedelta
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer

logger = logging.getLogger(__name__)

class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        next_slot = date.today() + timedelta(days=1)
        logger.info("Assigning appointment date %s for user %s", next_slot, self.request.user)
        serializer.save(user=self.request.user, appointment_date=next_slot, status='pending')
        logger.info("Booking created successfully for user %s", self.request.user)


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Option 1: List all bookings
        # return Booking.objects.all()

        # Option 2: List bookings for the authenticated user
        return Booking.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        logger.info("Received GET request for booking list by user %s", request.user)
        response = super().list(request, *args, **kwargs)
        logger.debug("Returning booking list: %s", response.data)
        return response
