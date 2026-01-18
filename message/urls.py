from django.urls import path
from . import views as v


app_name = "message"

urlpatterns = [
    path('messages/', v.MessageListView.as_view(), name='messages'),
    path('notifications/', v.NotificationListView.as_view(), name='notifications'),
]