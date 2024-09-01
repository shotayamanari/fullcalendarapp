window.addEventListener("load" , function (){ 
    let today   = new Date();

    let year    = String(today.getFullYear());
    let month   = ("0" + String(today.getMonth() + 1) ).slice(-2);
    let day     = ("0" + String(today.getDate()) ).slice(-2);

    let date    = year + "-" + month + "-" + day;

    let config_date = { 
        locale: "ja",
        dateFormat: "Y-m-d",
        defaultDate: date,
    }

    flatpickr("[name='deadline']", config_date);

    const calendar_elem = document.getElementById('calendar');

    // fullcalendar.jsの設定
    const config        = {};

    config.initialView  = 'dayGridMonth';

    // 日本語化、来月と先月のデータは非表示
    config.locale       = "local";
    config.showNonCurrentDates  = false;

    // dayCellContentで”日”の表示を削除する
    config.dayCellContent = (arg) => {
		return arg.date.getDate();
	}

    // eventsにURLを指定する
    config.events       = todo_url;

    // footerに月表示を変更するツールバーを設定する
    config.footerToolbar = {
                            left: '',
                            center:'prev,today,next',
                            right:'',
    }


    // toolbarの設定
    config.headerToolbar = {
                            start:'title',
                            center:'newcreate',
                            end:'today prev,next'
    }

    // 新規作成ボタンを追加
    config.customButtons = {
                            newcreate:{
                                text:'新規作成',
                                click: function() {
                                    alert('clicked the newcreate button!')
                                    // ここのfunctionでモーダルを表示させたい
                                }
                            }
    }

    // イベントを手に入れた時、何らかの処理をしてほしい場合
    /*
    config.eventSources = [{
                            url: todo_url,
                            method: 'GET',
                            success: (data) => {
                                // データ取得後に実行したい処理
                                console.log('イベントデータが取得されました:', data);
                                // 例) 右側のデータ一覧をレンダリングし直すなど
                            }
                        }];
    */

    config.eventClick   = (info) => {
        console.log('Event: ' + info.event.id);
        const target = document.getElementById("todo_" + info.event.id );
        if (target){
            target.scrollIntoView({  
                behavior: 'smooth',
            });
        }
    }




    const calendar      = new FullCalendar.Calendar(calendar_elem, config);
    calendar.render();

    

});





// モーダルで新規作成するときに、実行する
const send  = () => {

    // フォームの要素を取得
    const form      = document.querySelector("#form");

    const body      = new FormData(form);
    const url       = form.getAttribute("action");
    const method    = form.getAttribute("method");

    // fetchを使用してPOSTリクエストを送信
    fetch( url, { method , body } )
    .then( response => {
        // レスポンスのステータスコードが200番代ではないとき、↓を実行。
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then( data => {


            // TODO：fullcalendar.jsに対してイベントの再読み込みを依頼する
    
    
    })
    .catch( error => {
        // .then内でエラーが起きているとき、実行(throw new Error()も含む)
        console.log(error);
    });

}