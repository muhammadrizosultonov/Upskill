from django.urls import path 
from . import views as v

app_name = 'users'


urlpatterns = [
    path('login/', v.LoginView.as_view(), name='login'),
    path('profile/', v.ProfileView.as_view(), name='profile'),
    path('settings/', v.SettingsView.as_view(), name='settings'),
]