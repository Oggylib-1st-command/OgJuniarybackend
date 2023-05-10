#from rest_framework import serializers

from rest_framework import serializers
from .models import Genre, Book     


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('__all__')
        
class BookSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(many=True, slug_field='name', queryset = Genre.objects.all())
    class Meta:
        model = Book
        fields = ('__all__')