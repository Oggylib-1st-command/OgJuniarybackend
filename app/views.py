from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.db.models.functions import Lower
from django.db.models import Case, CharField, Value, When  
from rest_framework import serializers, mixins, viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from app.models import Genre, Book, User, Language, Reviews, Rating
from app.serializers import GenreSerializer, BookSerializer, UserSerializer, LanguageSerializer, ReviewsSerializer, RatingSerializer
from typing import List
from six import text_type
from functools import cmp_to_key
import functools
import math
import datetime
from rest_framework.viewsets import ModelViewSet

class GenreView(viewsets.ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()  
    
class LanguageView(viewsets.ModelViewSet):
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()   
    
class ReviewsView(viewsets.ModelViewSet):
    serializer_class = ReviewsSerializer
    queryset = Reviews.objects.all() 

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

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
        return titles.union(authors)
    
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
    
class AuthorList(viewsets.ModelViewSet):
    """Сортировка по авторам"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.annotate(
            lower_author=Lower('author'),
            is_english=Case(
                When(lower_author__regex=r'^[a-zA-Z]', then=Value('1')),
                default=Value('0'),
                output_field=CharField(),
            )
        ).order_by('is_english', 'lower_author')

        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('-is_english', '-lower_author')

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