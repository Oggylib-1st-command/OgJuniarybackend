from django.db import models

# Create your models here.   


class Genre(models.Model):
    """Жанры"""
    name = models.CharField("Имя", max_length=150)
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"
        

class Author(models.Model): # Возможно пригодится позже
    """Автор"""
    name = models.CharField("Имя", max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"  
        
   
class Book(models.Model):
    """Книга"""
    title = models.CharField("Название", max_length=100)
    author = models.CharField("Автор", max_length=150)
    image = models.CharField("Изображение", max_length=500) 
    description = models.TextField("Описание", null=True)
    genres = models.ManyToManyField('Genre', verbose_name="жанры", related_name='genres')
    language =  models.CharField("Язык", max_length=30, null=True)
    year = models.CharField("Год издания", max_length=10, null=True)
    #Статус бронирования
    #QR-код
    #Рейтинг

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"