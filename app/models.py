from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.models import User
# Create your models here.   

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

class Booking(models.Model):
    """Бронь"""
    name = models.CharField("Бронь", max_length=30, unique=True)
    def __str__(self):
            return self.name
    
    class Meta:
            verbose_name = "Бронь"
            verbose_name_plural = "Брони"

class Book(models.Model):
    """Книга"""
    bookings = models.TextField("Бронь книги", max_length=30, null=True, blank=True)
    title = models.CharField("Название", max_length=150, blank=True)
    author = models.CharField("Автор", max_length=100, blank=True)
    image = models.CharField("Изображение", max_length=10000000, blank=True) 
    description = models.TextField("Описание", null=True, blank=True)
    genres = models.ManyToManyField('Genre', verbose_name="жанры", related_name='genres', blank=True)
    languages = models.ForeignKey('Language', on_delete = models.CASCADE, verbose_name="языки", related_name='languages', max_length=30, null=True, blank=True)
    year = models.CharField("Год издания", max_length=10, null=True, blank=True)
    review = models.CharField("Отзыв", max_length=1500, null=True, blank=True)
    rating = models.CharField("Рейтинг", max_length=150, null=True, blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        """Сохранение id забронированной книги у текущего пользователя"""
        user = User.objects.get(id=self.owner.id)
        bookings_list = Booking.objects.filter(name=self.bookings)
        user.bookid.add(*bookings_list)
        user.bookid_history.add(*bookings_list)
        user.save()
        super().save(*args, **kwargs)
        
    def search_books(search_text, search_text1):
        """Поиск по названию и автору книги"""
        books = Book.objects.filter(Q(title__icontains=search_text))
        authors = Book.objects.filter(Q(author__icontains=search_text1))
        return books, authors

    def __str__(self):
        return "%s"%self.bookings
    
    def get_absolute_url(self):
        return reverse("book_detail", kwargs={"slug": self.url})
    
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
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    """Пользователь"""
    bookid = models.ManyToManyField('Booking', verbose_name="id взятой книги", related_name='bookid', default=None, max_length=30, blank=True)
    bookid_history = models.ManyToManyField('Booking', verbose_name="id бронированных книг в истории", related_name='bookid_history', default=None, max_length=1000, blank=True)
    bookid_favorites = models.ManyToManyField('Booking', verbose_name="id избранной книги", related_name='bookid_favorites', default=None, max_length=700, blank=True)
    
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
    