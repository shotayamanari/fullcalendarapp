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


    // 新規作成ボタンを追加
    const createButton   = { text: "新規作成", click: openModal }
    config.customButtons = {
        createButton,
    }

    // カレンダーのヘッダーの設定
    const left      = "createButton";
    const center    = "title";
    const right     = "prev,next";

    config.headerToolbar    = { left, center, right };

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

        document.querySelector("#todo_edit_form").setAttribute("action", todo_edit_url + info.event.id + "/");

        const deadline = `${info.event.start.getFullYear()}-${("0" + String(info.event.start.getMonth() + 1)).slice("-2")}-${("0" + String(info.event.start.getDate())).slice(-2)}`;

        document.querySelector("#todo_edit_form > [name='deadline']").value = deadline;
        document.querySelector("#todo_edit_form > [name='content']").value  = info.event.title;

        openModal();

        console.log('Event: ' + info.event.id);
        const target = document.getElementById("todo_" + info.event.id );
        if (target){
            target.scrollIntoView({  
                behavior: 'smooth',
            });
        }
    }



    // 再読込させるためにグローバル化させる
    // idの属性名と重複しないよう、_objをつけた。
    window.calendar_obj      = new FullCalendar.Calendar(calendar_elem, config);
    window.calendar_obj.render();

    // モーダルの送信ボタンが押されたときの処理
    document.querySelector("#todo_create_submit").addEventListener("click", () => {
        send();
    })

    // モーダルの送信ボタンが押されたときの処理
    document.querySelector("#todo_edit_submit").addEventListener("click", () => {
        edit();
    })
    

});

// モーダルを開く
const openModal = () => {
    console.log("モーダルを開く")
    document.querySelector(".modal_chk").checked = true;
}

// モーダルを閉じる
const closeModal = () => {
    document.querySelector(".modal_chk").checked = false;
}







// モーダルで新規作成するときに、実行する
const send  = () => {

    // フォームの要素を取得
    const form      = document.querySelector("#todo_create_form");

    // Djangoに送信する全データ
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
        closeModal();

        if (data.success) {
            console.log("投稿完了");

            // fullcalendar.jsに対してイベントの再読込を依頼
            // calendar_objはグローバル化しているので再読み込み可能
            window.calendar_obj.refetchEvents();
        }

    })
    .catch( error => {
        // .then内でエラーが起きているとき、実行(throw new Error()も含む)
        console.log(error);
    });

}


// モーダルで編集するときに、実行する
const edit  = () => {
   
    // フォームの要素を取得
    const form      = document.querySelector("#todo_edit_form");

    // Djangoに送信する全データ
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
        closeModal();

        if (data.success) {
            console.log("投稿完了");

            // fullcalendar.jsに対してイベントの再読込を依頼
            // calendar_objはグローバル化しているので再読み込み可能
            window.calendar_obj.refetchEvents();
        }

    })
    .catch( error => {
        // .then内でエラーが起きているとき、実行(throw new Error()も含む)
        console.log(error);
    });

} 