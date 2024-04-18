from dj_rest_auth.registration.views import RegisterView, ConfirmEmailView
from django.http import HttpResponse, JsonResponse
from .serializers import CustomRegisterSerializer
from .utils import SafeCustomSchemeRedirect
# from allauth.account.utils import email_confirmation_hmac
from allauth.account.models import EmailConfirmationHMAC


class CustomRegistrationView(RegisterView):
    serializer_class = CustomRegisterSerializer


class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, request, *args, **kwargs):
        self.key = kwargs['key']
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        return JsonResponse({
            'detail': 'Email address has been confirmed.'
        }, status=200)

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            return JsonResponse({
                'detail': 'The confirmation link was invalid, possibly because it has already been used.'
            }, status=404)
        return email_confirmation


def redirect_to_app(request):
    token = request.GET.get('token', '')
    if not token:
        return HttpResponse("Token is required", status=400)
    deep_link_url = f'exp://192.168.99.209:8081/--/confirm-email?token={token}'
    return SafeCustomSchemeRedirect(deep_link_url)

def password_reset_confirm(request, uidb64, token):
    if not token:
        return HttpResponse("Token is required", status=400)
    if not uidb64:
        return HttpResponse("UserId is required", status=400)
    password_reset_deeplink_url = f"exp://192.168.99.209:8081/--/reset-password/{uidb64}/{token}/"
    return SafeCustomSchemeRedirect(password_reset_deeplink_url)