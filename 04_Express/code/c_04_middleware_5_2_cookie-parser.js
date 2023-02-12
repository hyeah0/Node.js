// 써드파티 미들웨어
// cookie-parser

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); 
//app.use(cookieParser('서명')); // 서명이 들어간 쿠키

app.set('port', process.env.PORT || 3000);
 
app.get('/', (req, res) => { 
   
  // 쿠키 읽기
  console.log(req.cookies);                 //{ name: '%ED%99%8D%EA%B8%B8%EB%8F%99' }
  console.log(decodeURI(req.cookies.name)); // 홍길동

  // 서명이 있는 쿠키 읽을때
  // console.log(req.signedCookies);


  // 쿠키 생성
  // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
  const expiresDate = new Date();
  expiresDate.setMinutes(expiresDate.getMinutes()+5);

  res.cookie('name', encodeURIComponent('홍길동'), { 
      //expires: expiresDate,
      httpOnly: true,
      path: '/',
  })

  // 쿠키 삭제
  // res.clearCookie('name', encodeURIComponent('name'), { 
  //     httpOnly: true,
  //     path: '/',
  //  })

  res.send('send');

});
 
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

