from django.contrib import admin
from .models import Category, Groups, GroupMembers, Homework, HomeworkSubmission
# Register your models here.

admin.site.register(Category)
admin.site.register(Groups)
admin.site.register(GroupMembers)
admin.site.register(Homework)
admin.site.register(HomeworkSubmission)
