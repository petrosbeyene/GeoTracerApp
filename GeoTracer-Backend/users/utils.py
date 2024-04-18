from django.http import HttpResponseRedirect

class SafeCustomSchemeRedirect(HttpResponseRedirect):
    allowed_schemes = ['exp', 'http', 'https']

    def get_allowed_schemes(self):
        return self.allowed_schemes
