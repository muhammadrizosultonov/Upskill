from django.shortcuts import render
from django.views import View
# Create your views here.

class GroupsView(View):
    def get(self, request):
        return render(request, 'groups/groups.html')



class HomeworkView(View):
    def get(self, request):
        return render(request, 'groups/homework.html')