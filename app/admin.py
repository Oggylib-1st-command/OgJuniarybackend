from django.contrib import admin
from .models import Genre, Book, User, Language, Reviews

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    """Жанры"""
    list_display = ("id", "name",) 
    
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    """Язык"""
    list_display = ("id", "name",)      

@admin.register(Reviews)
class GenreAdmin(admin.ModelAdmin):
    """Жанры"""
    list_display = ("id", "email", "name", "surname", "text", "book",)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Книга"""
    list_display = [field.name for field in Book._meta.get_fields() if not field.many_to_many]
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Пользователь"""
    list_display = [field.name for field in User._meta.get_fields() if not field.many_to_many] 
    