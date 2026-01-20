from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.

class MessageListView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'message/messages.html')



class NotificationListView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'message/notifications.html')