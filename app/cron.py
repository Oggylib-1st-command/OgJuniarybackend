from .models import Book
from django.utils import timezone

def my_scheduled_job(*args, **kwargs):
    two_minutes_ago = timezone.now() - timezone.timedelta(minutes=2)
    Book.objects.filter(control=1, time__lte=two_minutes_ago).update(control=2)
    