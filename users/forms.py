from django import forms
from users.models import CustomUser
class UserRegistrationForm(forms.Form):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']
        
       