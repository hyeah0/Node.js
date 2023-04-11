const SocketIo = require('socket.io');

module.exports = (server) => {
    const io = SocketIo(server, {path: '/socket.io'});
     /* 웹소켓 연결시 */
    io.on('connection', (socket)=>{
        const req = socket.request;
        
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

        /* 클라이언트로 부터 메세지 수신시 */
        socket.on('reply', (data)=>{
            console.log(data);
        });
        /* 웹소켓 에러 */
        socket.on('error', (error)=>{
            console.error(error);
        });
        /* 웹소켓 연결 종료시 */
        socket.on('disconnect', ()=>{
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        // 3초마다 클라이언트로 메세지 전송
        socket.interval = setInterval(() => {
            socket.emit('news',
             'Hello Socket.IO (서버에서 클라이언트에게 보내는 메세지)');
        }, 3000);
    });
};

