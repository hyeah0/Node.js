<b>초기세팅</b>

1. 새로운 프로젝트 생성 + 세팅
2. app.js
3. routes/index.js

<b>웹소켓 구현</b>

1. 웹소켓 모듈 다운
2. app.js 코드 추가
3. 서버 웹소켓 로직 작성 (socket.js)
4. 클라이언트 웹소켓 코드 작성 (views/index.html, public cli_ws_websocket.js)

- 호출 화면

<hr>

## 초기세팅

### 1. 새로운 프로젝트 생성

1.  package.json 파일 생성

- ```
  npm init --yes
  ```

2.  패키지 설치

- ```
  npm i -D nodemon
  ```
- ```
  npm i cookie-parser dotenv express express-session morgan nunjucks
  ```

3.  .env 파일 생성 후 쿠키 비밀키 작성

- ```
  COOKIE_SECRET=gifchat
  ```

### 2. app.js 작성

- <details>
      <summary>⬇️ /app.js</summary>

  ```
  const express = require('express');
  const path = require('path');
  const morgan = require('morgan');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const nunjucks = require('nunjucks');
  const dotenv = require('dotenv');

  dotenv.config();

  const webSocket = require('./socket');
  const indexRouter = require('./routes');

  const app = express();
  app.set('port', process.env.PORT || 8005);
  app.set('view engine', 'html');
  nunjucks.configure('views',{
  express: app,
  watch: true
  });

  app.use(morgan('dev'));
  app.use(express.static(path.join(\_\_dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
  httpOnly: true,
  secure: false,
  }
  }));

  app.use('/', indexRouter);

  app.use((req, res, next)=>{
  const error = new Error(`${req.method} , ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
  });

  app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production'? err: {};
  res.status(err.status || 500);
  res.render('error');
  })

  const server = app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기중');
  });

  webSocket(server);
  ```

  </details>

### 3. routes/index.js 작성

- <details>
      <summary>⬇️ /routes/index.js</summary>

  ```
  const express =require('express');
  const router = express.Router();

  router.get('/', (req, res)=>{
  res.render('index');
  });

  module.exports = router;
  ```

</details>

## 웹소켓 구현

- 웹소켓 구조도

  <img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/websocket.jpg" width="100%">

  - ws 불러와 서버를 웹소켓과 연결

### 1. 웹소켓 모듈 다운

- ```
  npm i ws@8
  ```

### 2. app.js 코드 추가

<pre>
...
dotenv.config();

<b>const webSocket = require('./socket');</b>
const indexRouter = require('./routes');

...

<b>const server</b> = app.listen(app.get('port'), ()=>{
    console.log((app.get('port'), '번 포트에서 대기중'))
});

<b>webSocket(server);</b>

</pre>

### 3. 서버 웹소켓 로직 작성 (socket.js)

- ⬇️ /socket.js

  ```
  const webSocket = require('ws');

  module.exports = (server) => {
      const wss = new webSocket.Server({ sever });

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
  ```

#### - 클라이언트 ip 찾기

- ```
  req.headers['x-forwarded-for'] || req.socket.remoteAddress
  ```

#### - 웹소켓 상태, send 메서드

- readyState 가 Open인지 먼저 확인 후
  <br>-> send 메서드로 클라이언트에게 메세지를 보낸다.

- <table>
      <tr>
          <td>CONNECTING</td><td>연결중</td>
      </tr>
      <tr>
          <td>OPEN</td><td>열림</td>
      </tr>
      <tr>
          <td>CLOSING</td><td>닫는중</td>
      </tr>
      <tr>
          <td>CLOSED</td><td>닫힘</td>
      </tr>
  </table>

- <pre>
  ws.interval = setInterval(()=>{
      if(<b>ws.readyState === ws.OPEN</b>){
          <b>ws.send</b>('서버에서 클라이언트로 메세지를 보냅니다.');
      }
  }, 3000);
  </pre>

  - setInterval / clearInterval로 정리
    <pre>
    ws.on('close', () => {
        console.log('새로운 클라이언트 접속 해제', ip);
        <b>clearInterval</b>(ws.interval);
    });
    </pre>

### 4. 클라이언트 웹소켓 코드 작성 (views/index.html, public cli_ws_websocket.js)

- ⬇️ views/index.html
    <pre>
    ...
    &lt;body&gt;
        <b>&lt;script src="/cli_ws_websocket.js"&gt;&lt;/script&gt;</b>
    &lt;/body&gt;
    </pre>

- ⬇️ public/cli_ws_websocket.js

  ```
  const webSocket = new WebSocket('ws://localhost:8005');

  webSocket.onopen = function(){
    console.log('서버 웹소켓 연결 성공!');
  };

  webSocket.onmessage = function(event){
    console.log(event.data);
    webSocket.send('클라이언트에서 서버로 답장을 보냅니다.');
  };
  ```

  - 서버의 주소의 프로토콜은 ws이다.
    - <pre>
      const webSocket = new WebSocket('<b>ws</b>://localhost:8005');
      </pre>

### 호출 화면

<img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/ws_websocket01.png" width="100%">

<img src="https://github.com/hyeah0/Node.js/blob/main/06_WebSocket/a_md_img/ws_websocket02.png" width="100%">
