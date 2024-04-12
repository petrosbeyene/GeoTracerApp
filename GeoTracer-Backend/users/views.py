from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer


class CustomRegistrationView(RegisterView):
    serializer_class = CustomRegisterSerializer