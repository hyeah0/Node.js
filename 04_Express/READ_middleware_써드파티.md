## 써드파티 미들웨어(morgan, helmet... etc)

<table>
    <tr><td>Morgan</td><td>사용자에게 요청을 받을 때마다 log 생성</td></tr>
    <tr><td>Cookie-parser</td><td>cookie의 정보를 객체화 {key : value}</td></tr>
    <tr><td>Express-session</td><td>세션 관리용<br>로그인 등의 이유로 세션을 구현하거나, 특정 사용자를 위한 데이터를 임시적으로 저장(개인의 저장공간)</td></tr>
    <tr><td>Helmet</td><td>보안에 필요한 header를 추가(HTTP Header 보안 증진)</td></tr>
    <tr><td>CORS</td><td>헤더에 Access-Control-Allow-Orgin 을 추가</td></tr>
    <tr><td>Passport</td><td>클라이언트가 서버에 요청할 자격이 있는지 인증할 때 사용(로그인시 사용)</td></tr>
    <tr><td>multer</td><td>파일 업로드시 사용</td></tr>
</table>

- [써드파티 미들웨어 참고 링크](https://blog.bitsrc.io/5-express-middleware-libraries-every-developer-should-know-94e2728f7503)

## 1. Morgan

- 사용자에게 요청을 받을 때마다 log 생성

- 사용

```
app.use(morgan('dev'));
```

- 인수로 dev, combined, common, short, tiny 를 넣을 수 있다.

  - dev : 요청과 응답을 한눈에 볼 수 있어 개발 환경에서 많이 사용
  - [HTTP 메서드][url주소][HTTP 상태코드][응답속도]-[응답바이트]를 의미한다.
  - combined : 좀 더 상세히(ip, 시간 .. etc) 나와 있어 배포 환경에서 많이 사용 한다.

- 예시
  <img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/middleware_morgan.png" width="100%">

  ```
  const express = require('express');
  const path = require('path');
  const morgan = require('morgan');

  const app = express();

  app.use(morgan('dev'));

  app.get('/', (req,res)=>{
      res.send('morgan')
  })

  app.listen(3000,()=>{ console.log('morgan')})

  //    GET        /         200     1.661 ms  - 6
  // [HTTP 메서드][url주소][HTTP 상태코드][응답속도]-[응답바이트]
  ```

## 2. Cookie-parser

- cookie의 정보를 객체화 {key : value}
- 순서
  1. npm i cookie-parser
  2. const cookieParser = require('cookie-parser');
  3. app.use(cookieParser()); 또는
     <br> app.use(cookieParser('서명'));

1. 쿠키읽기

```
  console.log(req.cookies);
  console.log(req.cookies.key);   // 쿠키 value 값 출력

  console.log(req.signedCookies); // 서명이 있는 쿠키 읽을때
```

2. 쿠키 생성

```
res.cookie('key', 'value', {
      expires: 만료일,
      httpOnly: true,
      path: '/', ... 옵션들
})
```

- [옵션 참고](https://github.com/hyeah0/Node.js/tree/main/03_Server_REST_Cookie_Session_Cluster/03_Cookie_Session)

3. 쿠키 삭제

```
res.clearCookie('key', 'value', {
       httpOnly: true,
       path: '/',
})
```

- [cookie-parser 참고 코드 링크](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_5_2_cookie-parser.js)
- [cookie-parser 참고 링크](https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-bodyParser-cookieParser-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4)

## 3. Express-session

- express-session 으로 만든 session 이 저장 될 수 있는 3가지 방법
  1. [파일에 저장](https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-express-session-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4)
  2. DB에 저장
  3. Memory 에 저장

## 4. Helmet

- [Helmet 참고 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/c_04_middleware_5_4_helmet.js)

## 5. CORS

- [CORS 상세](https://github.com/hyeah0/Node.js/blob/main/04_Express/READ_middleware_cors.md)
- [CORS 참고 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_5_5_cors.js)

## 6. Passport

- [passport 로그인 사용 코드](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/R02_%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83.md)

- [Passport 미들웨어 참고 블로그](https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Passport-%EB%AA%A8%EB%93%88-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90)

## 7. multer

- [multer 상세](https://github.com/hyeah0/Node.js/blob/main/04_Express/READ_middleware_multer.md)
