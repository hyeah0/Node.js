const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// 쿠키를 자바스크립트 객체 형식으로 바꾸는 함수
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http.createServer(async (req, res) => {
  
  // 쿠키 객체화 
  const cookies = parseCookies(req.headers.cookie);

  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8085');
    const name = url.searchParams.get('name');
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();

    // 세션 객체에 등록
    // session[key] = { }
    // 특정 key 값인 객체체 값 등록 
    session[uniqueInt] = {
      name,
      expires,
    };

    console.log('세션 객체');
    console.log(session);
    // { '1675933066949': { name: '오렌지', expires: 2023-02-09T09:02:46.949Z } }

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();

  // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  
  } else {
    try {
      const data = await fs.readFile(path.join(__dirname, 'cookie.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다!');
  });
