from django.db import models
from django.utils import timezone


class Todo(models.Model):

    dt          = models.DateTimeField(verbose_name="投稿日時",default=timezone.now)
    deadline    = models.DateField(verbose_name="期日")
    content     = models.CharField(verbose_name="やること", max_length=300)

    done        = models.BooleanField(verbose_name="やった", default=False)

    def __str__(self):
        return self.comment