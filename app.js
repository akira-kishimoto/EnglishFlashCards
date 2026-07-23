// =========================================
// English Flash Cards Version 2
// app.js
// =========================================

let current = 0;
let timer = null;
let seconds = 3;
let showingEnglish = false;

// cards.js が読み込まれている前提
const total = cards.length;

// ----------------------------
// 初期化
// ----------------------------

window.onload = function () {

    loadPosition();

    showCard();

};

// ----------------------------
// カード表示
// ----------------------------

function showCard() {

    clearInterval(timer);

    showingEnglish = false;

    document.getElementById("jp").textContent =
        cards[current].jp;

    document.getElementById("en").textContent = "";

    startCountdown();

    updateProgress();

    savePosition();

}

// ----------------------------
// カウントダウン
// ----------------------------

function startCountdown() {

    seconds = 3;

    document.getElementById("countdown").textContent = seconds;

    timer = setInterval(function(){

        seconds--;

        if(seconds>0){

            document.getElementById("countdown").textContent = seconds;

        }else{

            clearInterval(timer);

            document.getElementById("countdown").textContent = "";

            showEnglish();

        }

    },1000);

}

// ----------------------------
// 英語表示
// ----------------------------

function showEnglish(){

    showingEnglish=true;

    document.getElementById("en").textContent =
        cards[current].en;

}

// ----------------------------
// 次へ
// ----------------------------

function nextCard(){

    current++;

    if(current>=total){

        current=0;

    }

    showCard();

}

// ----------------------------
// 前へ
// ----------------------------

function prevCard(){

    current--;

    if(current<0){

        current=total-1;

    }

    showCard();

}

// ----------------------------
// 発音
// ----------------------------

function speak(){

    if(!showingEnglish) return;

    const msg = new SpeechSynthesisUtterance(
        cards[current].en
    );

    msg.lang="en-US";

    speechSynthesis.cancel();

    speechSynthesis.speak(msg);

}

// ----------------------------
// 進捗バー
// ----------------------------

function updateProgress(){

    const percent=((current+1)/total)*100;

    document.getElementById("progressBar").style.width=
        percent+"%";

    document.getElementById("progressText").textContent=
        (current+1)+" / "+total;

}

// ----------------------------
// ジャンプ
// ----------------------------

function jumpCard(){

    let no=parseInt(document.getElementById("jumpNo").value);

    if(isNaN(no)) return;

    if(no<1) no=1;

    if(no>total) no=total;

    current=no-1;

    showCard();

}

// Enterキー対応
document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        if(document.activeElement.id==="jumpNo"){

            jumpCard();

        }

    }

});

// ----------------------------
// 保存
// ----------------------------

function savePosition(){

    localStorage.setItem(
        "flashcard-position",
        current
    );

}

// ----------------------------
// 読み込み
// ----------------------------

function loadPosition(){

    const p=localStorage.getItem(
        "flashcard-position"
    );

    if(p!==null){

        current=parseInt(p);

    }

}

// ----------------------------
// ランダム（Version3用）
// ----------------------------

function randomCard(){

    current=Math.floor(Math.random()*total);

    showCard();

}