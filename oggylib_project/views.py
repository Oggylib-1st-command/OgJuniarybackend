from django.http import HttpResponse
from django.shortcuts import render
from .models import Book

def home(request):
    book = Book.objects.all()
    return HttpResponse(book)
