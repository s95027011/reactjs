from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone
import uuid

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
def only_int(value):
    if not value.isdigit():
        raise ValidationError('只能輸入數字')


class Member(models.Model):
    SEX = (('0', '女性'), ('1', '男性'), ('2', '不選擇'))
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    member_name = models.CharField(blank=False, max_length=20)
    member_sex = models.CharField(choices=SEX, max_length=1, help_text='輸入性別')
    member_addr = models.CharField(blank=False, max_length=50)
    #member_email = models.EmailField(max_length=254)
    member_birth = models.DateField(blank=True)
    member_phone = models.CharField(blank=False, max_length=10,)

    def __str__(self):
        return self.user.username

    # member_register_date = models.DateField(auto_now_add=timezone.now)
    # member_login = models.DateField(auto_now_add=timezone.now)  # 現在登入時間
    # member_pwd = models.CharField(max_length=20)
    # Password in django https://stackoverflow.com/questions/17523263/how-to-create-password-field-in-model-djang