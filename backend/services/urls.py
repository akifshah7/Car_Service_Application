from django.urls import path
from .views import ServiceSelectionCreateView, ServiceSelectionListView

urlpatterns = [
    path("service-selections/", ServiceSelectionListView.as_view(), name="service-selection-list"),
    path("service-selections/create/", ServiceSelectionCreateView.as_view(), name="service-selection-create"),
]
