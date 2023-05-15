from django.shortcuts import render, redirect
from rest_framework.response import Response
from app.models import Genre, Book, User
from rest_framework import serializers
from rest_framework import viewsets
from app.serializers import GenreSerializer, BookSerializer, UserSerializer


from rest_framework import status, generics
import math

class GenreView(viewsets.ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()  

class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    

class Users(generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        users = User.objects.all()
        total_users = users.count()
        if search_param:
            users = users.filter(title__icontains=search_param)
        serializer = self.serializer_class(users[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_users,
            "page": page_num,
            "last_page": math.ceil(total_users / limit_num),
            "users": serializer.data
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "user": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class UserDetail(generics.GenericAPIView):
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

# Create your views her