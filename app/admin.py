from django.contrib import admin

# Register your models here.

from .models import Genre, Book, User, Language

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """челы"""
    list_display = ("id", "email", "name",) 

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    """Жанры"""
    list_display = ("id", "name",) 
    
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    """Жанры"""
    list_display = ("id", "name",)        

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Авторы"""
    list_display = [field.name for field in Book._meta.get_fields() if not field.many_to_many]
    
