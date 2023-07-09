from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.db.models.functions import Lower
from django.db.models import Case, CharField, Value, When  
from rest_framework import serializers, mixins, viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from app.models import Genre, Book, User, Language, Booking
from app.serializers import GenreSerializer, BookSerializer, UserSerializer, LanguageSerializer, BookingSerializer
from typing import List
from six import text_type
from functools import cmp_to_key
import functools
import math

class GenreView(viewsets.ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()  
    
class LanguageView(viewsets.ModelViewSet):
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()    

class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
        
    def get(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "user": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class UserDetail(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        user = self.get_user(pk=pk)
        if user == None:
            return Response({"status": "fail", "message": f"User with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(user)
        return Response({"status": "success", "": serializer.data})

    def patch(self, request, pk):
        user = self.get_user(pk)
        if user == None:
            return Response({"status": "fail", "message": f"User with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.validated_data['updatedAt'] = datetime.now()
            serializer.save()
            return Response({"status": "success", "user": serializer.data})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_user(pk)
        if user == None:
            return Response({"status": "fail", "message": f"User with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class BooksView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        books = Book.objects.all()
        total_books = books.count()
        if search_param:
            books = books.filter(title__icontains=search_param)
        serializer = self.serializer_class(books[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_books,
            "page": page_num,
            "last_page": math.ceil(total_books / limit_num),
            "books": serializer.data
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "book": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class BookDetail(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_book(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        book = self.get_book(pk=pk)
        if book == None:
            return Response({"status": "fail", "message": f"Book with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(book)
        return Response({"status": "success", "": serializer.data})

    def patch(self, request, pk):
        book = self.get_book(pk)
        if book == None:
            return Response({"status": "fail", "message": f"Book with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.validated_data['updatedAt'] = datetime.now()
            serializer.save()
            return Response({"status": "success", "book": serializer.data})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_book(pk)
        if book == None:
            return Response({"status": "fail", "message": f"Book with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
    