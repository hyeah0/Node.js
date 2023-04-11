console.log('웹소켓 자바스크립트');

const webSocket = new WebSocket('ws://localhost:8005');

webSocket.onopen = function(){
    console.log('서버 웹소켓 연결 성공!');
};

webSocket.onmessage = function(event){
    console.log(event.data);
    webSocket.send('클라이언트에서 서버로 답장을 보냅니다.');
};