from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'books', views.BookView, 'books-lisr')
router.register(r'users', views.UserView, 'users-list')
router.register(r'genre', views.GenreView, 'genre-list')
router.register(r'language', views.LanguageView, 'language-list')
router.register(r'rating', views.RatingView, 'rating-list')
router.register(r'reviews', views.ReviewsView, 'reviews-list')
router.register(r'sorted/book', views.BookList, 'book-list-sort')
router.register(r'sorted/author', views.AuthorList, 'author-list-sort')
router.register(r'sorted/rating', views.RatingList, 'rating-list-sort')
router.register(r'sorted/time', views.CreatedList, 'time-list-sort')
router.register(r'slider/rating', views.SliderRating, 'rating-list-slider')
router.register(r'slider/time', views.SliderCreated, 'time-list-slider')
router.register(r'search', views.BookSearchView, 'book-search')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]