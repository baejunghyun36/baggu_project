// 로그인 대신 임시방편
let senderIdx = prompt("보내는 사람 idx를 입력하세요")
let senderNickname = prompt("보내는 사람 닉네임 ")
let receiverIdx = prompt("받는 사람 Idx를 입력하세요")
let receiverNickname = prompt("받는 사람 닉네임")
let roomId = prompt("채팅방 번호를 입력하세요 ")

//SSE 연결하기
const eventSource = new EventSource(`http://localhost:8080/baggu/chatRoom/${roomId}`);

eventSource.onmessage = (event)=>{

    const data = JSON.parse(event.data);
    if(data.senderIdx == senderIdx){
        //로그인한 유저가 보낸 메세지 
        //파란 박스 (오른쪽)
        initMyMessage(data); 
    }
    else{
        //회색 박스(왼쪽)
        initYourMessage(data); 
    }
}

//파란박스 만들기
function getSendMsgBox(data){
    let md = data.createdAt.substring(5,10)
    let tm = data.createdAt.substring(11,16)
    convertTime = tm + " | " + md

    return `<div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b></span>
  </div>`; 
}

//회색박스 만들기
function getReceiveMsgBox(data){

    let md = data.createdAt.substring(5,10)
    let tm = data.createdAt.substring(11,16)
    convertTime = tm + " | " + md
    return `<div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b></span>
  </div>`;
}

document.querySelector("#senderIdx").innerHTML = senderIdx; 


//최초 초기화될 때 1번방 3건이 있으면 3건을 다 가져와
//addMessage() 함수 호출 시 DB에 insert 되고, 그 데이터가 자동으로 흘러들어온다. (SSE)
//파란박스 초기화하기
function initMyMessage(data){
    let chatBox = document.querySelector("#chat-box"); 

    let sendBox = document.createElement("div");
    sendBox.className = "outgoing_msg";  

    sendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(sendBox); 

    document.documentElement.scrollTop = document.body.scrollHeight; 

}

window.addEventListener('focus', function () {
    let focusState = {
        roomId : roomId,
        focusOn : true,
        userIdx : senderIdx
    }
    console.log(focusState);
    this.fetch("http://localhost:8080/baggu/focusState", {
        method:"post",
        body: JSON.stringify(focusState),
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    });
  });

window.addEventListener('blur', function () {
    let focusState = {
        roomId : roomId,
        focusOn : false,
        userIdx : senderIdx
    }
    console.log(focusState);
    this.fetch("http://localhost:8080/baggu/focusState", {
        method:"post",
        body: JSON.stringify(focusState),
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    });
  });

// 회색박스 초기화하기
function initYourMessage(data){
    let chatBox = document.querySelector("#chat-box"); 

    let receivedBox = document.createElement("div");
    receivedBox.className = "received_msg";  

    receivedBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(receivedBox); 

    document.documentElement.scrollTop = document.body.scrollHeight; 
}

//AJAX 채팅 메시지를 전송 -> room number 로 
async function addMessage(){
   
    let msgInput = document.querySelector("#chat-outgoing-msg"); 

    let chat = {
        senderIdx : senderIdx, 
        senderNickname : senderNickname,
        receiverIdx : receiverIdx,
        receiverNickname : receiverNickname,
        roomId: roomId,
        msg: msgInput.value
    }; 

    //통신 
    fetch("http://localhost:8080/baggu/chat", {
        method:"post", //http post 메서드 (새로운 데이터를 write)
        body: JSON.stringify(chat), //JS -> JSON
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    });
    msgInput.value = ""; 
}


//버튼 클릭시 메시지 전송
document.querySelector("#chat-send").addEventListener("click", ()=>{



    addMessage(); 
}); 

//엔터를 치면 메세지 전송 
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{


    // 엔터 키코드가 13임. 
    if(e.keyCode ===13){
        //alert("클릭됨"); 
        addMessage()
    }
}); 