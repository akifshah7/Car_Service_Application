from django.urls import path
from .views import BookingCreateView, BookingListView

urlpatterns = [
    path('bookings/create/', BookingCreateView.as_view(), name='booking-create'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
]
