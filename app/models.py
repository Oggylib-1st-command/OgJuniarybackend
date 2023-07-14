from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.models import User 
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Avg
import random
import datetime

class Genre(models.Model):
    """Жанры"""
    name = models.CharField("Имя", max_length=150, unique=True)
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"
        
class Language(models.Model):
    """Язык"""
    name = models.CharField("Язык", max_length=30, unique=True)
    def __str__(self):
            return self.name
    
    class Meta:
            verbose_name = "Язык"
            verbose_name_plural = "Языки"
           
class Reviews(models.Model):
    """Отзывы"""
    email = models.EmailField(blank=True, default='')
    name = models.CharField("Имя", max_length=255, null=True, blank=True)
    surname = models.CharField("Фамилия", max_length=255, null=True, blank=True)
    text = models.TextField("Комментарий", max_length=2000, null=True, blank=True)
    book = models.ForeignKey('Book', verbose_name="Книга", on_delete=models.CASCADE, null=True, blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, verbose_name="Кто пишет отзыв", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        """Сохранение данных текущего пользователя"""
        if self.owner is not None:
            user = User.objects.get(id=self.owner.id)
            self.email = user.email
            self.name = user.name
            self.surname = user.surname
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.book}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        unique_together = ('owner', 'book')

class Rating(models.Model):
    """Рейтинг"""
    value = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(1)])
    book = models.ForeignKey('Book', on_delete=models.CASCADE, verbose_name="Книга", related_name='ratings', null=True, blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, verbose_name="Кто поставил оценку", null=True, blank=True)
    
    def save(self, *args, **kwargs):
        super(Rating, self).save(*args, **kwargs)
        self.update_book_rating()

    def delete(self, *args, **kwargs):
        super(Rating, self).delete(*args, **kwargs)
        self.update_book_rating()

    def update_book_rating(self):
        """Средний рейтинг для книги"""
        if self.book_id:
            average_rating = Rating.objects.filter(book_id=self.book_id).aggregate(Avg('value'))['value__avg']
            if average_rating is not None:
                self.book.rating = round(average_rating, 1)
            else:
                self.book.rating = 0.0
            self.book.save()
    
    def __str__(self):
        return f'{self.value}'
    
    class Meta:
        verbose_name = "Рейтинг"
        verbose_name_plural = "Рейтинги"

class Book(models.Model):
    """Книга"""
    bookings = models.TextField("Бронь книги", max_length=5, null=True, blank=True)
    title = models.CharField("Название", max_length=150, blank=True)
    author = models.CharField("Автор", max_length=100, blank=True)
    image = models.CharField("Изображение", max_length=10000000, blank=True) 
    description = models.TextField("Описание", null=True, blank=True)
    genres = models.ManyToManyField('Genre', verbose_name="Жанры", related_name='genres', blank=True)
    languages = models.ForeignKey('Language', on_delete = models.CASCADE, verbose_name="Языки", related_name='languages', max_length=30, null=True, blank=True)
    year = models.CharField("Год издания", max_length=10, null=True, blank=True)
    rating = models.FloatField(default=0.0, blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, verbose_name="Кто забронировал", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        """Бронь и возврат книги"""
        if self.owner is not None:
            user = User.objects.get(id=self.owner.id)
            if self.bookings is not None:
                if self.bookings != '':
                    user.bookid.add(self.bookings)
                    user.bookid_history.add(self.bookings)
                elif self.pk:
                    user.bookid.remove(self.pk)
                    self.owner = None
            user.save()

        super().save(*args, **kwargs)        
    
    def search_books(search_text, search_text1):
        """Поиск по названию и автору книги"""
        titles = Book.objects.filter(Q(title__icontains=search_text))
        authors = Book.objects.filter(Q(author__icontains=search_text1))
        return books, authors

    def __str__(self):
        return f'{self.rating}'
    
    def __str__(self):
        return "%s"%self.bookings
    
    def __str__(self):
        return f"Book ID: {self.id}"
    
    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"
           
class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False   )
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    """Пользователь"""
    bookid = models.ManyToManyField('Book', verbose_name="id взятой книги", related_name='bookid', blank=True)
    bookid_history = models.ManyToManyField('Book', verbose_name="id бронированных книг в истории", related_name='bookid_history', default=None, max_length=1000, blank=True)
    bookid_favorites = models.CharField(max_length=700, blank=True, null=True)
    
    email = models.EmailField(blank=True, default='', unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    surname = models.CharField(max_length=255, blank=True, default='')
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'   
    
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name or self.email.split('@')[0]
    