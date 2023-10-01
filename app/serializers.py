from rest_framework import serializers
from .models import MainGenre, Genre, Book, User, Language, Reviews
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from project import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'email', 'image', 'selection_genres', 'bookid', 'bookid_history', 'bookid_favorites',)

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('__all__')    

class MainGenreSerializer(serializers.ModelSerializer):
    name = GenreSerializer(many=True)
    
    class Meta:
        model = MainGenre
        fields = ('__all__')        
        
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('__all__')
        
class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ('__all__')
        
class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, required=False)
    languages = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = '__all__'
