from django.urls import path
from . import views as v


app_name = 'dashboard'

urlpatterns = [
    path('', v.DashboardView.as_view(), name='dashboard'),
]