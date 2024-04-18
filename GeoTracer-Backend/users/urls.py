from django.urls import path
from users.views import CustomRegistrationView, CustomConfirmEmailView, redirect_to_app, password_reset_confirm

urlpatterns = [
    path('register/', CustomRegistrationView.as_view(), name='custom_register'),
    path('registration/account-confirm-email/<str:key>/', CustomConfirmEmailView.as_view(), name='account_confirm_email'),
    path('confirm-email/', redirect_to_app, name='redirect_to_app'),
    path('password-reset/confirm/<uidb64>/<token>/', password_reset_confirm, name='password_reset_confirm'),
]