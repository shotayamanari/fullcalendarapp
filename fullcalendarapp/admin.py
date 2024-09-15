from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Category,Todo

class CategoryAdmin(admin.ModelAdmin):
    list_display    = [ "id", "name", "created_at", "updated_at", "color" ]

class TodoAdmin(admin.ModelAdmin):
    list_display    = [ "id", "dt", "deadline", "content", "done" , "category"]


admin.site.register(Category,CategoryAdmin)
admin.site.register(Todo,TodoAdmin)