from django.db import models
from django.utils.timezone import now

# Create your models here.
class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    author = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateTimeField(default=now)  # Automatically set timestamp
    likes = models.PositiveIntegerField(default=0)  # Default likes to 0
    image = models.URLField(blank=True, null=True)  # Image URL (optional)

    def __str__(self):
        return f"{self.author}: {self.text[:30]}"
