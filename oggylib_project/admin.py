from django.contrib import admin

from .models import Book, Users, Journal, Favorite, Genere, GenereBook

admin.site.register(Book)
admin.site.register(Users)
admin.site.register(Journal)
admin.site.register(Favorite)
admin.site.register(Genere)
admin.site.register(GenereBook)

