"""
URL configuration for django_rest_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from .view import home_page  # view的class
from rest_framework.routers import DefaultRouter
from user_api import views
from user_api.views import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from django.contrib import admin
from django.conf.urls.static import static  # 靜態資源
from . import settings

router = DefaultRouter()
router.register(r'member', views.MemberViewSet)
# router.register(r'order_product', views.OrderProducrViewSet)

urlpatterns = [
    path('', home_page),
    path('admin/', admin.site.urls),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view()),
    path('api/user/', UserAPI.as_view()),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    re_path(r'^api-auth/', include('rest_framework.urls',
            namespace='rest_framework')),
    re_path(r'^api/', include(router.urls)),
    path('api/getmember/', views.GetMemberView.as_view())
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
