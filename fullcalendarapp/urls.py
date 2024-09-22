from django.urls import path
from . import views

app_name    = "fullcalendarapp"
urlpatterns = [ 
    path("", views.index, name="index"),
    path("done/<int:pk>/", views.done, name="done"),
    path("todo/",views.todo, name="todo"),

    path("todo_create/",views.todo_create, name="todo_create"),
    path("todo_edit/<int:pk>/", views.todo_edit, name="todo_edit"),
    path("todo_delete/<int:pk>/", views.todo_delete, name="todo_delte"),
]