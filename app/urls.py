from django.urls import path
from . import views
from app.views import UserDetail, Users

    
urlpatterns = [
    path('', Users.as_view()),
    path('<str:pk>', UserDetail.as_view()),
]