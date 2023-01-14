const http = require('http');
const fs = require('fs');
// const http2 = require('http2'); // https

// 서버생성
// http.createServer((request, response))=>{})
const server = http.createServer((req, res) => {
  
  console.log('incoming...');
  
  console.log(req.headers);       // header 정보 확인
  console.log(req.httpVersion);   // 1.1
  console.log(req.method);        // GET
  console.log(req.url);           // /favicon.ico
 
  // 서버에 반응하기
  // res.write('hi');
  // res.end();

  // url에 따라 다르게 반응하기
  // url가져오기
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  
  // 해더끝이 '/', 'courses', else 일 경우에 따라서 다르게 실행
  // pipe는 연결 기능
  // fs.createReadStream : stream 형태로 파일을 읽어온다.
  if (url === '/') {
    fs.createReadStream('./html/index.html').pipe(res);

  } else if (url === '/courses') {
    fs.createReadStream('./html/courses.html').pipe(res);

  } else {
    fs.createReadStream('./html/not-found.html').pipe(res);
  }

});

server.listen(8080);
