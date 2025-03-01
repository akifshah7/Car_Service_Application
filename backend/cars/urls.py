from django.urls import path
from .views import CarSelectionCreateView, CarSelectionListView

urlpatterns = [
    path("car-selections/", CarSelectionListView.as_view(), name="car-selection-list"),
    path("car-selections/create/", CarSelectionCreateView.as_view(), name="car-selection-create"),
]