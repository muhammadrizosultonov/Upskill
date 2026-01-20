from django.urls import path 
from . import views as v
from django.contrib.auth import views as av

app_name = 'users'


urlpatterns = [
    path('profile/', v.ProfileView.as_view(), name='profile'),
    path('settings/', v.SettingsView.as_view(), name='settings'),
    path('login/', av.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', av.LogoutView.as_view(), name='logout'),
]