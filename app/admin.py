from django.contrib import admin
from .models import MainGenre, Genre, Book, User, Language, Reviews
from django.contrib.admin.models import LogEntry

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    '''Поджанры'''
    list_display = ('id', 'name',) 
    
@admin.register(MainGenre)
class MainGenreAdmin(admin.ModelAdmin):
    '''Главные жанры'''
    list_display = ('id', 'main',) 
    
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    '''Языки'''
    list_display = ('id', 'name',)      

@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    '''Отзывы'''
    list_display = ('id', 'email', 'name', 'surname', 'text', 'book',)
    
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    '''Книга'''
    list_display = ('title', 'author', 'bookings' , 'description', 'languages', 'year', 'rating', 'owner', 'created_at', 'image',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Пользователь'''
    list_display = ('email', 'name', 'surname', 'is_active',)
    
    