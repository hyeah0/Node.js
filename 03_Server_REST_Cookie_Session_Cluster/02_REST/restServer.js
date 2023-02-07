const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {}; // 데이터 저장용

/*
Read    GET     /                전체 글 보기(restFront.html)
Read    GET     /about           소개페이지(about.html)
Read    GET     /users           유저 정보

Create  POST    /user            등록
Update  PUT     /user/사용자id     수정
Delete  DELETE  /user/사용자id     삭제
*/

http.createServer(async (req, res) => {
  
  try {
    
    /* -------------------------------------------------------------------------- */
    // GET
    /* -------------------------------------------------------------------------- */
    if (req.method === 'GET') {

      if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);

      } else if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);

      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }

      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }

    /* -------------------------------------------------------------------------- */
    // POST
    /* -------------------------------------------------------------------------- */
    } else if (req.method === 'POST') {
      
      if (req.url === '/user') {
        
        let body = '';

        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {

          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          
          // users 객체의 id가 [..]인 값을 입력값으로 저장
          users[id] = name;

          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('등록 성공');
        });
      }

    /* -------------------------------------------------------------------------- */
    // PUT
    /* -------------------------------------------------------------------------- */
    } else if (req.method === 'PUT') {
      
      /* startsWith() 메서드
       어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환
      */
       if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
        
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end(JSON.stringify(users));
        });
      }

    /* -------------------------------------------------------------------------- */
    // DELETE
    /* -------------------------------------------------------------------------- */
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');

  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})

  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
