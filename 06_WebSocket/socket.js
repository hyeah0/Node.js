const webSocket = require('ws');

module.exports = (server) => {
    const wss = new webSocket.Server({ server });

    /* 웹소켓 연결시 */
    wss.on('connection', (ws, req) => {
        // 클라이언트 ip 확인
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        console.log('새로운 클라이언트 접속', ip);

        /* 클라이언트로 부터 메세지 수신시 */
        ws.on('message', (message) => {
            console.log(message.toString());
        });

        /* 웹소켓 에러 */
        ws.on('error', (error) => {
            console.error(error);
        });

        /* 웹소켓 연결 종료시 */
        ws.on('close', () => {
            console.log('새로운 클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        // 3초마다 클라이언트로 메세지 전송
        ws.interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
                ws.send('서버에서 클라이언트로 메세지를 보냅니다.');
            }
        }, 3000);
    });

};

