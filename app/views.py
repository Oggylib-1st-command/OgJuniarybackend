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

class BookSearchView(APIView):
    """Поиск по названию и автору книги"""
    def get(self, request, *args, **kwargs):
        search_text = request.GET.get('q', '')
        search_text1 = request.GET.get('q', '')
        books, authors = Book.search_books(search_text, search_text1)
        title_serializer = BookSerializer(books, many=True)
        author_serializer = BookSerializer(authors, many=True)
        return Response({'books': title_serializer.data, 'authors': author_serializer.data})
    
class BookList(generics.ListAPIView):
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
    
class AuthorList(generics.ListAPIView):
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


class RatingList(generics.ListAPIView):
    """Сортировка по рейтингу"""
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.order_by('-rating')
    
        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('rating')
        
        return queryset
    
class CreatedList(generics.ListAPIView):
    """Сортировка по новизне"""
    serializer_class = BookSerializer
    
    def get_queryset(self):
        queryset = Book.objects.order_by('-created_at')
        
        if self.request.query_params.get('sort') == 'desc':
            queryset = queryset.order_by('created_at')
        
        return queryset
    
class SliderRating(generics.ListAPIView):
    """Слайдер по популярности (рейтингу)"""
    serializer_class = BookSerializer
    
    def get_queryset(self):
        queryset = Book.objects.order_by('-rating')[:5]
        
        return queryset
    
class SliderCreated(generics.ListAPIView):
    """Слайдер по новизне"""
    serializer_class = BookSerializer
    
    def get_queryset(self):
        queryset = Book.objects.order_by('-created_at')[:5]
        
        return queryset