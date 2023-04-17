from django.shortcuts import render

from app.models import Author, Genre, Book

from rest_framework import viewsets
from app.serializers import GenreSerializer, AuthorSerializer, BookSerializer

class GenreView(viewsets.ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()  
    
class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()   


   

# Create your views here.