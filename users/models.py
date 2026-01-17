from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    
    def __str__(self):
        return self.username
    

class Profile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('assistant', 'Assistant'),
        ('student', 'Student'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=16, choices=ROLE_CHOICES)
    avatar = models.ImageField(upload_to='users/', blank=True, null=True, default='users/default_image.png')

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
