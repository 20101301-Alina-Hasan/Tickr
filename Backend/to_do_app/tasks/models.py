from django.db import models
from django.contrib.auth.models import User

STATUS_CHOICES = [
    ('PENDING', 'PENDING'),
    ('COMPLETE', 'COMPLETE'),
]

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    due_date = models.DateField()

    def __str__(self):
        return self.title