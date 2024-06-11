from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.db.models import Sum, F
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework import viewsets, status, mixins, generics, permissions
from rest_framework.response import Response
from user_api.models import Member
from user_api.serializers import MemberSerializer
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import BasicAuthentication
from knox.views import LoginView as KnoxLoginView
from datetime import date, timedelta, datetime
from itertools import chain
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.serializers.json import DjangoJSONEncoder
import json
from rest_framework import generics
from django.contrib.auth.models import User
# Create your views here.
################################################################
################################################################
# login api


class LoginAPI(KnoxLoginView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
# register api


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    # def get_object(self):
    # return self.request.user
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, username=self.request.user)
        # print(user)
        query = Member.objects.get(user=user)
        member_serializer = MemberSerializer(query)
        return Response(member_serializer.data)

class GetMemberView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser, ]
    serializer_class = MemberSerializer

    def get_queryset(self):
        name = self.request.query_params.get('member_name')
        queryset = Member.objects.filter(member_name__icontains=name)
        return queryset

class MemberViewSet(viewsets.ModelViewSet):
    search_fields = ['member_name']
    filter_backends = (filters.SearchFilter,)
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get_permissions(self):
        if self.action in ('list',):
            self.permission_classes = [IsAdminUser]
        return [permission() for permission in self.permission_classes]
# Admin can view member list

    @permission_classes((IsAdminUser))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)