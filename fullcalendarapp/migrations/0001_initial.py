# Generated by Django 5.1 on 2024-08-26 14:34

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dt', models.DateTimeField(default=django.utils.timezone.now, verbose_name='投稿日時')),
                ('deadline', models.DateField(verbose_name='期日')),
                ('content', models.CharField(max_length=300, verbose_name='やること')),
                ('done', models.BooleanField(default=False, verbose_name='やった')),
            ],
        ),
    ]
