const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// 쿠키를 자바스크립트 객체 형식으로 바꾸는 함수
const parseCookies = (cookie = '') =>
  cookie.split(';').map(v => v.split('=')).reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

// 쿠키를 자바스크립트 객체 형식으로 바꾸는 함수 상세
const parseCookieD = (cookie = '') => {
  // key = value
  // keyName = 오렌지 일때
  console.log('----------- 쿠키를 key와 value로 저장하는 함수 상세 -----------');
  console.log(cookie);              // keyName=%EC%98%A4%EB%A0%8C%EC%A7%80
  console.log(cookie.split(';'));   // [ 'keyName=%EC%98%A4%EB%A0%8C%EC%A7%80' ]
  console.log(cookie.split(';').map(v => v.split('=')));  // [ [ 'keyName', '%EC%98%A4%EB%A0%8C%EC%A7%80' ] ]
  console.log(cookie.split(';').map(v => v.split('=')).reduce((acc, [k, v]) => {
    acc[k.trim()] = decodeURIComponent(v);
    return acc; // { keyName: '오렌지' }
  }, {}));
};

// --------------------------------------------------------------------------------------
// 서버 실행시
// --------------------------------------------------------------------------------------
http.createServer(async (req, res) => {
  
  // 1. 쿠키를 자바스크립트 객체 형식으로 만든다.
  // 2. 
  //  1. html form 등록을 누를 경우 (주소가 /login으로 시작되는 경우)
  //  2. 쿠키가 있는 경우
  //  3. 쿠키가 사라진 경우 cookie.html 파일을 읽는다.

  // 1. 쿠키를 key와 value로 저장한 객체
  const cookies = parseCookies(req.headers.cookie); // { keyName: '오렌지' }
  parseCookieD(req.headers.cookie);

  // 1. html form 등록을 누를경우 (주소가 /login으로 시작하는 경우)
  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8084');
    const name = url.searchParams.get('name');
    const expires = new Date();
    
    console.log('----------- date -----------')
    console.log(`new Date() : ${expires}`)                          // Thu Feb 09 2023 17:48:20 GMT+0900 (Korean Standard Time)
    console.log(`expires.getMinutes() : ${expires.getMinutes()}`)   // 48
    console.log(`expires.toGMTString() : ${expires.toGMTString()}`) // Thu, 09 Feb 2023 08:48:20 GMT
    console.log('----------------------------')

    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `keyName=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  
  // 2. 이미 쿠키가 있는 경우
  } else if (cookies.keyName) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.keyName}님 안녕하세요`);

  // 3. 쿠키가 사라진 경우
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
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');

  });
