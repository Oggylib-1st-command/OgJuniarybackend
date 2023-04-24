from django.db import models

class Book(models.Model):
    title = models.CharField(max_length = 50)
    author_name = models.CharField(max_length = 50)
    photo = models.TextField(null = True) 
    description = models.TextField()
    booking_status = models.BooleanField()
    qr_code = models.TextField(null = True)
    languag = models.CharField(max_length = 50)
    year_publication = models.CharField(max_length = 4)
    rating = models.IntegerField()

    def _str_(self):
        return self.title

class Users(models.Model) :
    surname = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    Email = models.EmailField()
    photo = models.TextField()
    user_role = models.BooleanField()
    token = models.TextField()

class Journal(models.Model) :
    book = models.ForeignKey('Book' , on_delete = models.PROTECT, null = True)
    user = models.ForeignKey('Users' , on_delete = models.PROTECT, null = True)
    date_capture = models.CharField(max_length = 4)
    year_delivery = models.CharField(max_length = 4)
    recall = models.TextField()
    date_and_time = models.CharField(max_length = 4)

class Favorite(models.Model) :
    book = models.ForeignKey('Book' , on_delete = models.PROTECT, null = True)
    user = models.ForeignKey('Users' , on_delete = models.PROTECT, null = True)

class Genere(models.Model) :
    title = models.CharField(max_length = 50)

class GenereBook(models.Model) :
   book = models.ForeignKey('Book' , on_delete = models.PROTECT, null = True)
   genre = models.ForeignKey('Genere' , on_delete = models.PROTECT, null = True)
