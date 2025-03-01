from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model() 

class Car(models.Model):
    BRAND_CHOICES = [
        ('toyota', 'Toyota'),
        ('honda', 'Honda'),
        ('ford', 'Ford'),
        ('chevrolet', 'Chevrolet'),
        ('bmw', 'BMW'),
        ('audi', 'Audi'),
        ('mercedes', 'Mercedes-Benz'),
        ('nissan', 'Nissan'),
        ('volkswagen', 'Volkswagen'),
        ('hyundai', 'Hyundai'),
    ]
    FUEL_CHOICES = [
        ("petrol", "Petrol"),
        ("diesel", "Diesel"),
    ]
    TRANSMISSION_CHOICES = [
        ("manual", "Manual"),
        ("automatic", "Automatic"),
    ]
    
    brand = models.CharField(max_length=100, choices=BRAND_CHOICES)
    model = models.CharField(max_length=100)
    fuel_type = models.CharField(max_length=10, choices=FUEL_CHOICES)
    transmission_type = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES)

    def __str__(self):
        return f"{self.brand} {self.model}"
    
class CarSelection(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car_brand = models.CharField(max_length=255, default="DefaultBrand")
    car_model = models.CharField(max_length=255, default="DefaultModel")
    fuel_type = models.CharField(
        max_length=50,
        choices=[
            ("Petrol", "Petrol"),
            ("Diesel", "Diesel")
        ],
        default="Petrol"  # Set a default value
    )
    transmission = models.CharField(
        max_length=50,
        choices=[
            ("Manual", "Manual"),
            ("Automatic", "Automatic")
        ],
        default="Manual"  # Set a default value
    )
    def __str__(self):
        return f"{self.car_brand} {self.car_model} - {self.fuel_type}, {self.transmission}"
