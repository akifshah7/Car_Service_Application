# booking/models.py
from django.db import models
from django.conf import settings
from datetime import date, timedelta
from cars.models import CarSelection
from services.models import ServiceSelection

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    car_selection = models.ForeignKey(CarSelection, on_delete=models.CASCADE, null=True, blank=True)
    service_pack = models.ForeignKey(ServiceSelection, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

    def save(self, *args, **kwargs):
        if not self.appointment_date:
            self.appointment_date = date.today() + timedelta(days=1)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking {self.id} by {self.user} for {self.car_selection}"
