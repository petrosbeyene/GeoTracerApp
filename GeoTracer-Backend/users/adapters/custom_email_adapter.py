from django.template.loader import render_to_string
from django.utils.html import strip_tags
from allauth.account.adapter import DefaultAccountAdapter

class CustomEmailAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix, email, context):
        """
        Override the method to send email, using the default synchronous method
        and adjust the activation URL for deep linking with the React Native app.
        """
        if 'key' in context:
            # Customize this URL to your deep linking format
            context['activate_url'] = 'http://192.168.99.209:8000/api/v1/users/confirm-email?token={token}'.format(token=context['key'])

        # Call the super class's send_mail method to send the email
        return super().send_mail(template_prefix, email, context)