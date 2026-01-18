from django.urls import path
from . import views as v


app_name = 'groups'

urlpatterns = [
    path('', v.GroupsView.as_view(), name='groups'),
    path('homework/', v.HomeworkView.as_view(), name='homework'),
]