from django.shortcuts import render, redirect
from django.views import View

from .models import Todo
from .forms import TodoForm,DateSearchForm

# timezoneとdatetimeをimportする
from django.utils import timezone
import datetime

# json　を　fullcalendar.jsに返す
from django.http import JsonResponse

class IndexView(View):
    def get(self, request, *args, **kwargs):

        context             = {}
        context["todos"]    = Todo.objects.order_by("deadline", "dt")


        return render(request, "fullcalendarapp/index.html", context)


    def post(self, request, *args, **kwargs):

        form    = TodoForm(request.POST)

        if form.is_valid():
            form.save()

        return redirect("fullcalendarapp:index")

index   = IndexView.as_view()


class DoneView(View):
    def post(self, request, pk, *args, **kwargs):
        todo        = Todo.objects.filter(id=pk).first()
        todo.done   = not todo.done
        todo.save()

        return redirect("fullcalendarapp:index")

done    = DoneView.as_view()


# 年月を指定して、一致するTodoだけをレスポンス
class TodoView(View):
    def get(self, request, *args, **kwargs):

        # TODO: Todoモデルを利用してデータを取り出す
        # 指定された年月の範囲内のデータだけ取り出す

        events = []
        form   = DateSearchForm(request.GET)

        date   = timezone.now().date()
        start  = date.replace(day=1)
        end    = date.replace(month=date.month % 12 + 1) - datetime.timedelta(days=1)

        if form.is_valid():
            start = form.cleaned_data["start"]
            end   = form.cleaned_data["end"]


        # deadlineがstartよりも未来(大きい)、なおかつ、endよりも過去のデータを取り出す
        todos = Todo.objects.filter(deadline__gte=start, deadline__lte=end)
        
        # TODO: eventsを作る
        for todo in todos:

            event                   = {}
            event["id"]             = todo.id      
            event["title"]          = f"{todo.content}"
            event["start"]          = todo.deadline
            event["borderColor"]    = "white"

            if todo.done:
             event["backgroundColor"] = "gray"
            else:
             event["backgroundColor"] = "deepskyblue"

            events.append(event)

        return JsonResponse(events, safe=False)

todo = TodoView.as_view()