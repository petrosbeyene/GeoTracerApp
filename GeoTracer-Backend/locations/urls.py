from django.urls import path
from .views import GeoDataListCreateAPIView, GeoDataRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('geodata/', GeoDataListCreateAPIView.as_view(), name='geodata-list-create'),
    path('geodata/<int:pk>/', GeoDataRetrieveUpdateDestroyAPIView.as_view(), name='geodata-detail'),
]