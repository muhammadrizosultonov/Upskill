from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.contrib.auth import authenticate, login, logout

# Create your views here.
class LoginView(View):
    def get(self, request):
        return render(request, 'users/login.html')
        
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user:
            login(request, user)
            return redirect('users:profile')
        else:
            return render(request, 'users/login.html', {'error': 'Xatolik'})
        

class ProfileView(View):
    def get(self, request):
        return render(request, 'users/profile.html')
    


class SettingsView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'users/settings.html')


class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Siz tizimdan chiqdingiz.')
        return redirect('users:login')
    