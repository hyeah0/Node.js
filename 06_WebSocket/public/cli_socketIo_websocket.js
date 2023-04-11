console.log('웹소켓 socket.io 자바스크립트');

const socket = io.connect('http://localhost:8005', {
    path: '/socket.io',
    transports: ['websocket']
});

socket.on('news', function(data){
    console.log(data);
    socket.emit('reply',
     'Hello Node.js (클라이언트에서 서버에게 보낸 메세지)');
});