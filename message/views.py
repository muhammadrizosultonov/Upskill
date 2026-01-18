from django.shortcuts import render
from django.views import View
# Create your views here.

class MessageListView(View):
    def get(self, request):
        return render(request, 'message/messages.html')



class NotificationListView(View):
    def get(self, request):
        return render(request, 'message/notifications.html')