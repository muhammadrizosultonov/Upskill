from django.shortcuts import render, redirect
from users.forms import UserRegistrationForm
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View

# Create your views here.


class RegisterView(LoginRequiredMixin, View):
    def get(self, request):
        form = UserRegistrationForm()
        return render(request, 'users/register.html', {'form': form})
    
    def post(self, request):
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('login')
        return render(request, 'users/register.html', {'form': form})

class SignupView(View):
    def get(self, request):
        form = UserRegistrationForm()
        return render(request, 'users/signup.html', {'form': form})
    
    def post(self, request):
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('login')
        return render(request, 'users/signup.html', {'form': form})