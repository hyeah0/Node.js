1. 서버생성
2. 서버 요청(req)
3. 서버 응답(res)
4. url에 따라 다른 서버응답(res)

   - [1~4 코드참고](https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/01_CreateServer/createServer.js)

5. [한번에 두개 서버 실행](https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/01_CreateServer/server1-2.js)

6. [html 파일읽기](https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/01_CreateServer/server2.js)

## 1. 서버생성

```
const http = require('http');

const server = http.createServer((req, res) => {

})

server.listen(8080, ()=>{console.log()});

```

<br>

## 2. 서버 요청(req)

```
const http = require('http');

const server = http.createServer((req, res) => {

  console.log(req.headers);       // header 정보 확인
  console.log(req.httpVersion);   // 1.1
  console.log(req.method);        // GET
  console.log(req.url);           // /favicon.ico

});

server.listen(8080);

```

<br>

## 3. 서버 응답(res)

```
const http = require('http');

const server = http.createServer((req, res) => {

  res.write('<h2>hi</h2>');
  res.end();

});

server.listen(8080);

```

<br>

## 4. url에 따라 다른 서버 응답

```
const http = require('http');

const server = http.createServer((req, res) => {

  const url = req.url;
  res.setHeader('Content-Type', 'text/html');

  // 해더끝이 '/', 'courses', else 일 경우에 따라서 다르게 실행
  if (url === '/') {
    res.write('<h2>url : /</h2>');
    res.end();

  } else if (url === '/courses') {
    res.write('<h2>url : /courses</h2>');
    res.end();

  } else {
    res.write('<h2>url : not / , /courses</h2>');
    res.end();
  }

});

server.listen(8080);

```
