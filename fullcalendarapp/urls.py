from django.urls import path
from . import views

app_name    = "fullcalendarapp"
urlpatterns = [ 
    path("", views.index, name="index"),
    path("done/<int:pk>/", views.done, name="done"),
    path("todo/",views.todo, name="todo"),
]