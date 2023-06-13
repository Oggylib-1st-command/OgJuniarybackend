from rest_framework import serializers
from .models import Genre, Book, User, Language, Booking
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from project import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "surname", "email", "bookid", "bookid_history", "bookid_favorites",)
        
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('__all__')
        
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('__all__')
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('__all__')
        
class BookSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(many=True, slug_field="name", queryset = Genre.objects.all())
    class Meta:
        model = Book
        fields = ('__all__')