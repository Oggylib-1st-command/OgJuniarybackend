from django.contrib import admin
from .models import Genre, Book, User, Language, Reviews, Rating
from django.contrib.admin.models import LogEntry

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    '''Жанры'''
    list_display = ('id', 'name',) 
    
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    '''Языки'''
    list_display = ('id', 'name',)      

@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    '''Отзывы'''
    list_display = ('id', 'email', 'name', 'surname', 'text', 'book',)
    
@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    '''Рейтинги'''
    list_display = ('id', 'value', 'book', 'owner',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    '''Книга'''
    list_display = ('title', 'author', 'bookings' , 'description', 'languages', 'year', 'rating', 'owner', 'created_at', 'image',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Пользователь'''
    list_display = ('email', 'name', 'surname', 'is_active', 'bookid_favorites',)
    
    