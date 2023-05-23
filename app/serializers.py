#from rest_framework import serializers

from rest_framework import serializers
from .models import Genre, Book, User, Language     
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from project import settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "surname", "email", )
        
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('__all__')
        
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('__all__')
        
class BookSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(many=True, slug_field="name", queryset = Genre.objects.all())
    #languages = serializers.SlugRelatedField(many=True, slug_field="name", queryset = Language.objects.all())
    class Meta:
        model = Book
        fields = ('__all__')
        
