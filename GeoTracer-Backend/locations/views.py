from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from .models import GeoData
from .serializers import GeoDataSerializer
from rest_framework.permissions import IsAuthenticated

class GeoDataListCreateAPIView(ListCreateAPIView):
    serializer_class = GeoDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GeoData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GeoDataRetrieveUpdateDestroyAPIView(RetrieveDestroyAPIView):
    serializer_class = GeoDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GeoData.objects.filter(user=self.request.user)
