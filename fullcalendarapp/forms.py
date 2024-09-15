from django import forms
from .models import Todo

# datetimeをインポートする
import datetime


class TodoForm(forms.ModelForm):
    class Meta:
        model   = Todo
        fields  = [ "deadline","content", "category" ]

class DateSearchForm(forms.Form):

    # バリデーションエラー回避のために、一時的にDateTime型で受け取る
    start  = forms.DateTimeField()
    end    = forms.DateTimeField()
    # 以下の処理でendの値は

    def clean(self):
        cleaned_data = super().clean()

        # 日付型に直すには .date()を使う

        # 月初に設定(月初めでなかった場合に変換する)
        start = cleaned_data["start"].replace(day=1).date()

        # 最終日を取り出す
        end   = (start.replace(month=start.month % 12 + 1, day=1) - datetime.timedelta(days=1))

        cleaned_data["start"] = start
        cleaned_data["end"]   = end

        return cleaned_data
