from django.db import models
from users.models import CustomUser

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64)
    icon = models.CharField(max_length=32)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Groups(models.Model):
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'}, related_name='teacher_groups')
    assistant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'assistant'}, related_name='assistant_groups', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='groups')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True, null=True)
    term = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name
    

class GroupMembers(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='members')
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, related_name='student_groups')

    class Meta:
        unique_together = ('group', 'student')

    def __str__(self):
        return f"{self.student.user.username} in {self.group.name}"
    


class Homework(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='homeworks')
    title = models.CharField(max_length=128)
    description = models.TextField()
    assigned_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()

    def __str__(self):
        return f"{self.title} for {self.group.name}"
    

class HomeworkSubmission(models.Model):
    homework = models.ForeignKey(Homework, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, related_name='homework_submissions')
    title = models.CharField(max_length=128)
    submission_file = models.FileField(upload_to='homework_submissions/', blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    grade = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together = ('homework', 'student')

    def __str__(self):
        return f"Submission by {self.student.user.username} for {self.homework.title}"
    
