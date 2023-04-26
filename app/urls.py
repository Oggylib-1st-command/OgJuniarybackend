from django.urls import path
from . import views
from app.views import Books, BookDetail

    
urlpatterns = [
    path('', Books.as_view()),
    path('<str:pk>', BookDetail.as_view())
]