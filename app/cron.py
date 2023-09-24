from .models import Book

def my_scheduled_job(*args, **kwargs):
    Book.objects.filter(control=1).update(control=2)