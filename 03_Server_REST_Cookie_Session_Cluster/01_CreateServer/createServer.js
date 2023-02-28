/*
  1. 서버생성
  2. 서버 요청(req)
  3. 서버 응답(res)
  4. url에 따라 다른 서버응답(res)
*/

const http = require('http');

const server = http.createServer((req, res) => {

  /* ---------------------------------------------------------------------------- 
      서버 요청(req) 
    ---------------------------------------------------------------------------- */
  console.log(req.url, req.method, req.headers);  // / GET {headers..}
  
  console.log(req.httpVersion);   // 1.1
  console.log(req.url);           // /favicon.ico
  console.log(req.method);        // GET
  console.log(req.headers);       // header 정보 확인
  
  /* ---------------------------------------------------------------------------- 
      서버 응답(res) 
    ---------------------------------------------------------------------------- */
  //res.write('<h1>hi</h1>')
  //res.end();

  /* ---------------------------------------------------------------------------- 
      url에 따라 다른 서버응답(res) 
    ---------------------------------------------------------------------------- */
  const url = req.url;
  // res.statusCode(200);
  // res.setHeader('Content-Type', 'text/html');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
 
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
})

server.listen(8080, ()=>{console.log('aaa')});
