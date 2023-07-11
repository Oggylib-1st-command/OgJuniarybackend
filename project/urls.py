"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'genre', views.GenreView, 'genres')
router.register(r'language', views.LanguageView, 'languages')
router.register(r'book', views.BookView, 'book')
router.register(r'users', views.UserView, 'userss')
router.register(r'books', views.BooksView, 'books')
router.register(r'reviews', views.ReviewsView, 'reviewss')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('search/', views.BookSearchView.as_view(), name='book_search'),
    path('sorted/', views.BookList.as_view(), name='book-list-sort'),
    path('sorted/author/', views.AuthorList.as_view(), name='author-list-sort'),
]