from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


class Category(models.Model):
    name = models.CharField(verbose_name="カテゴリ名",max_length=10)

    created_at = models.DateTimeField(verbose_name="作成日時", default=timezone.now)
    updated_at = models.DateTimeField(verbose_name="編集日時", auto_now=True)

    # カテゴリに色をつけるためフィールドを追加
    color_regex = RegexValidator(regex=r'^#(?:[0-9a-fA-F]{3}){1,2}$')
    color       = models.CharField(verbose_name="カテゴリ色",max_length=7,validators=[color_regex],default="#000000")

    def __str__(self):
        return self.name

class Todo(models.Model):

    dt          = models.DateTimeField(verbose_name="投稿日時",default=timezone.now)

    category    = models.ForeignKey(Category, verbose_name="カテゴリ", on_delete=models.SET_NULL, null=True, blank=True)

    deadline    = models.DateField(verbose_name="期日")
    content     = models.CharField(verbose_name="やること", max_length=300)

    done        = models.BooleanField(verbose_name="やった", default=False)

    def __str__(self):
        return self.content