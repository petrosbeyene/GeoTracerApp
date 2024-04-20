from datetime import datetime
from django.db import models
from users.models import CustomUser

class GeoData(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='geographica_datas')
    latitude = models.FloatField()
    longitude = models.FloatField()
    accuracy = models.FloatField()
    altitude = models.FloatField()
    speed = models.FloatField()
    heading = models.FloatField() # in degrees {0: north, 90: east, 180: south, and 270: west}
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.user.username} - {self.timestamp}"
