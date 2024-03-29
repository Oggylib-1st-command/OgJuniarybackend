from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.db.models.functions import Lower
from django.db.models import Case, CharField, Value, When
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.db.models import Q
from django.http import Http404
from rest_framework import serializers, mixins, viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Genre, Book, User, Language, Reviews, MainGenre
from .serializers import GenreSerializer, BookSerializer, UserSerializer, LanguageSerializer, ReviewsSerializer, MainGenreSerializer, AdminLoginSerializer
from typing import List
from six import text_type
from functools import cmp_to_key
import functools
import math
import datetime


class GenreView(viewsets.ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()  

class MainGenreView(viewsets.ModelViewSet):
    serializer_class = MainGenreSerializer
    queryset = MainGenre.objects.all()  

class LanguageView(viewsets.ModelViewSet):
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()   

class ReviewsView(viewsets.ModelViewSet):
    serializer_class = ReviewsSerializer
    queryset = Reviews.objects.all() 

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class BookSearchView(viewsets.ModelViewSet):
    """Поиск по названию и автору книги""" 
    serializer_class = BookSerializer

    def get_queryset(self):
        search_text = self.request.GET.get('q', '')
        search_text1 = self.request.GET.get('q', '')
        titles, authors = Book.search_books(search_text, search_text1)
        result = titles | authors
        return result

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class UserSearchView(viewsets.ModelViewSet):
    """Поиск по имени и фамилии пользователя""" 
    serializer_class = UserSerializer

    def get_queryset(self):
        search_text = self.request.GET.get('q', '')
        search_text1 = self.request.GET.get('q', '')
        names, surnames = User.search_users(search_text, search_text1)
        result = names | surnames
        return result

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BookList(viewsets.ModelViewSet):
    """Сортировка по алфавиту"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.annotate(
            lower_title=Lower('title'),
            is_english=Case(
                When(lower_title__regex=r'^[a-zA-Z]', then=Value('1')),
                default=Value('0'),
                output_field=CharField(),
            )
        ).order_by('is_english', 'lower_title')

        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('-is_english', '-lower_title')

        return queryset
    
class UserList(viewsets.ModelViewSet):
    """Сортировка пользователей"""
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.annotate(
            lower_user=Lower('name'),
            is_english=Case(
                When(lower_user__regex=r'^[a-zA-Z]', then=Value('1')),
                default=Value('0'),
                output_field=CharField(),
            )
        ).order_by('is_english', 'lower_user')

        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('-is_english', '-lower_user')

        return queryset

class RatingList(viewsets.ModelViewSet):
    """Сортировка по рейтингу"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.order_by('-rating')

        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('rating')

        return queryset

class CreatedList(viewsets.ModelViewSet):
    """Сортировка по новизне"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.order_by('-created_at')

        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('created_at')

        return queryset

class SliderRating(viewsets.ModelViewSet):
    """Слайдер по популярности (рейтингу)"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.order_by('-rating')[:5]

        return queryset

class SliderCreated(viewsets.ModelViewSet): 
    """Слайдер по новизне"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.order_by('-created_at')[:5]

        return queryset

class FilterGenre(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        genre_id = self.kwargs.get('genre_id')
        queryset = Book.objects.filter(genres__id=genre_id)
        return queryset

class AdminLoginCheck(APIView):
    """Проверка админа"""
    serializer_class = AdminLoginSerializer
     
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        
        if user is not None and user.is_superuser:
            return Response({'authenticated': True}, status=status.HTTP_200_OK)
        else:
            return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
        
class BookOwner(viewsets.ViewSet):
    serializer_class = BookSerializer

    def list(self, request, book_pk):
        book = Book.objects.get(id=book_pk)
        
        if book.owner is not None:
            user = User.objects.get(id=book.owner.id)
            data = {
                'name': user.name,
                'surname': user.surname
            }
            return Response(data)
