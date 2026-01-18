from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View

# Create your views here.
class LoginView(View):
    def get(self, request):
        return render(request, 'users/login.html')



class ProfileView(View):
    def get(self, request):
        return render(request, 'users/profile.html')
    


class SettingsView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'users/settings.html')