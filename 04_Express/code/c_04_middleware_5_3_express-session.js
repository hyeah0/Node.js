// 써드파티 미들웨어
// express_session

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(cookieParser('signed')); // 서명이 들어간 쿠키
// app.use(session());
app.use(session({
  resave: false,              // true: 세션 수정사항이 없어라도 세션 다시 저장
  saveUninitialized: false,   // true: 세션에 저장할 내역이 없어도 세션을 생성 
  secret: 'signed',           // cookieParser의 서명과 동일하게 하기
  cookie:{
    httpOnly: true,
  },
  name: 'session-cookie',     // 세션 쿠키명 디폴트값 : connect.sid, 다른 이름을 줄 수도 있다.
}));

app.set('port', process.env.PORT || 3000);
 
app.get('/', (req, res) => { 
   
  req.sessionID= "h1"; 
  console.log(req.session);
  console.log(req.session.name);
  console.log(req.sessionID);
  //console.log(req.destroy); // 세션 모두 제거

  res.send('express-session');

});
 
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

