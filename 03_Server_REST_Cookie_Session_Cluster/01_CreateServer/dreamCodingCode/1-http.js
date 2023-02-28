const http = require('http');
const fs = require('fs');
// const http2 = require('http2'); // https

const server = http.createServer((req, res) => {
  
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
