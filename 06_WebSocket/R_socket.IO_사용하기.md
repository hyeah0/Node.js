- <b>ws패키지</b> -> 간단한 웹소켓 사용시
- <b>socket.IO</b> -> 구현 서비스가 좀 더 복잡해 질때
  - socket.IO : 편의기능이 많이 추가되어있다.

<hr>
<b>초기세팅</b>

- [ws모듈 구현과 동일](https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/R_ws%EB%AA%A8%EB%93%88_%EC%9B%B9%EC%86%8C%EC%BC%93%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.md)

<b>웹소켓 구현</b>

1. 웹소켓 모듈 다운
2. app.js 코드 추가
3. 서버 웹소켓 로직 작성 (socketIo.js)
4. 클라이언트 웹소켓 코드 작성 (views/index.html, public cli_socketIo_websocket.js)

<hr>

## 웹소켓 구현

### 1. 웹소켓 모듈 다운

- ```
  npm i socket.io@4
  ```

### 2. app.js 코드 추가

<pre>
...
dotenv.config();

<b>const webSocket = require('./socketIo');</b>
const indexRouter = require('./routes');

...

<b>const server</b> = app.listen(app.get('port'), ()=>{
    console.log((app.get('port'), '번 포트에서 대기중'))
});

<b>webSocket(server);</b>

</pre>

### 3. 서버 웹소켓 로직 작성 (socketIo.js)

- ⬇️ /socketIo.js

  ```
  const SocketIo = require('socket.io');

  module.exports = (server) => {
      const io = SocketIo(server, {path: '/socket.io'});

      /* 웹소켓 연결시 */
      io.on('connection', (socket)=>{

          // 클라이언트 ip 확인
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
              socket.emit('news', 'Hello Socket.IO');
          }, 3000);

      });


      };
  ```

#### emit 메서드

- <pre>// 3초마다 클라이언트로 메세지 전송
    socket.interval = setInterval(() => {
        <b>socket.emit('news', 'Hello Socket.IO');</b>
    }, 3000);
    </pre>

  - socket.emit(이벤트이름, 데이터);

### 4. 클라이언트 웹소켓 코드 작성 (views/index.html, public cli_socketIo_websocket.js)

- ⬇️ views/index.html
    <pre>
    ...
    &lt;body&gt;
        <b>&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
        &lt;script src="/cli_cli_socketIo_websocket_websocket.js"&gt;&lt;/script&gt;</b>
    &lt;/body&gt;
    </pre>

  - <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_01.png" width="100%">

    - `/socket.io/socket.io.js`
      - Soket.IO 에서 클라이언트로 제공하는 스크립트로 실제 파일이 아니다.

- ⬇️ public/cli_socketIo_websocket.js

  ```
  const socket = io.connect('http://localhost:8005', {
      path: '/socket.io',
  });

  socket.on('news', function(data){
      console.log(data);
      socket.emit('reply',
      'Hello Node.js (클라이언트에서 서버에게 보낸 메세지)');
  });
  ```

  - <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_02.png" width="100%">

    - Soket.IO 에서 클라이언트로 제공하는 스크립트가 제공하는 io 객체에 서버 주소를 적어 연결한다.
    - ws 프로토콜이 아니라 http 프로토콜을 사용한다(ws 모듈과 다른점)
    - 서버의 path 옵션과 일치해야 통신이 가능하다.

#### 서버에서 클라이언트에게 메세지 전송

- <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_03.png" width="100%">

  - 서버에서 보내는 news 이벤트를 받기위해 news 이벤트 리스너를 생성

#### 클라이언트에서 서버에게 메세지 전송

- <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_04.png" width="100%">

  - 클라이언트는 news 이벤트가 발생하면 emit 메서드로 다시 서버에 답장한다.
  - 서버의 reply 이벤트 리스너로 클라이언트로 답장이 간다.

### 호출 화면

#### - 클라이언트 쪽에 transports 설정 안함

- <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_05.png" width="100%">

1. <b>⭐️ Soket.IO 먼저 폴링 방식으로 서버와 연결한다.</b>

   - 폴링방식 : 클라이언트에서 서버로만 데이터가 향하는 단방향 방식

2. 연결 후 웹소켓을 사용할 수 있으면 웹소켓으로 업그레이드 한다.

   ```
   - 웹소켓 지원하는 브라우저는 폴링방식
   - 웹소켓 미지원 브라우저는 폴링->웹소켓방식으로 사용 가능
   ```

#### - 클라이언트 쪽에 transports 설정

<img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/socketio_06.png" width="100%">

- ⭐️ <b>처음부터 웹소켓방식으로 사용하고 싶으면 클라이언트 쪽에 옵션을 설정하면 된다.</b>

<pre>
const socket = io.connect('http://localhost:8005', {
    path: '/socket.io',
    <b>transports: ['websocket']</b>
});
</pre>
