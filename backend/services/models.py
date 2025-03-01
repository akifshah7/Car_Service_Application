from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ServiceSelection(models.Model):
    SERVICE_CHOICES = [
        ("BASIC", "Basic"),
        ("COMPREHENSIVE", "Comprehensive")
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        # Automatically set the price based on the service type.
        if self.service_type == "BASIC":
            self.price = 2499
        elif self.service_type == "COMPREHENSIVE":
            self.price = 4999
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user} - {self.get_service_type_display()}"
