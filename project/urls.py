from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'genre', views.GenreView, 'genres')
router.register(r'language', views.LanguageView, 'languages')
router.register(r'users', views.UserView, 'userss')
router.register(r'books', views.BookView, 'books')
router.register(r'reviews', views.ReviewsView, 'reviewss')
router.register(r'rating', views.RatingView, 'ratings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('search/', views.BookSearchView.as_view(), name='book_search'),
    path('sorted/', views.BookList.as_view(), name='book-list-sort'),
    path('sorted/author/', views.AuthorList.as_view(), name='author-list-sort'),
    path('sorted/rating/', views.RatingBook.as_view(), name='rating-list-sort'),
]