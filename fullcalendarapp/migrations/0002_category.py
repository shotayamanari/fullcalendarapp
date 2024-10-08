# Generated by Django 5.1 on 2024-09-14 13:35

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fullcalendarapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, verbose_name='カテゴリ名')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='編集日時')),
            ],
        ),
    ]
