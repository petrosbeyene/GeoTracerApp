from django.template.loader import render_to_string
from django.utils.html import strip_tags
from users.tasks import send_email_task
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

        subject_template = f'{template_prefix}_subject.txt'
        message_template = f'{template_prefix}_message.txt'
        subject = render_to_string(subject_template, context).strip()
        message = render_to_string(message_template, context)
        message_plain = strip_tags(message)
        
        recipient_list = [email]
        send_email_task.delay(subject, message_plain, recipient_list)
