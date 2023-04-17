#from rest_framework import serializers

from rest_framework import serializers
from .models import Genre, Author, Book


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ("id", "name")
        
class AuthorSerializer(serializers.ModelSerializer):  # Возможно пригодится позже
    class Meta:
        model = Author
        fields = ("id", "name")
        
class BookSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    class Meta:
        model = Book
        fields = ("id", "title", "image", "author", "genres", "description", "language", "year")
