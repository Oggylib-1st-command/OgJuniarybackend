from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils import timezone

# Create your models here.   

class User(models.Model):
    """чел"""
    
    name = models.CharField("имя", max_length=50, blank=True)
    surname = models.CharField("фамилия", max_length=50, blank=True)
    email = models.EmailField(blank=True, default='', unique=True)
    
    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = "чел"
        verbose_name_plural = "челы"


class Genre(models.Model):
    """Жанры"""
    name = models.CharField("Имя", max_length=150, unique=True)
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"
        

class Book(models.Model):
    """Книга"""
    title = models.CharField("Название", max_length=100, blank=True)
    author = models.CharField("Автор", max_length=150, blank=True)
    image = models.CharField("Изображение", max_length=10000000, blank=True) 
    description = models.TextField("Описание", null=True, blank=True)
    genres = models.ManyToManyField('Genre', verbose_name="жанры", related_name='genres', blank=True)
    language =  models.CharField("Язык", max_length=30, null=True, blank=True)
    year = models.CharField("Год издания", max_length=10, null=True, blank=True)
    
    
    #Статус бронирования
    #QR-код
    #Рейтинг

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"
        
        
