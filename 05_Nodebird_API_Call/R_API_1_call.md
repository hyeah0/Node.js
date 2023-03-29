# API 사용하기 01

- 데이터를 가공해 2차적인 서비스를 하려는 회사가 API를 이용

  - 쇼핑몰 데이터들을 모아 최저가를 알려주는 서비스 >> 2차 서비스

- [API 01](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_1.md) : 로그인한 사용자 정보 조회 가능
  - [API 01 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_1_call.md)
- [API 02](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_2.md) : 내가 올린 포스트와 해시태그 검색 결과 확인 가능
  - [API 02 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_2_call.md)

# 화면

<div>
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/nodebird-api-call_01.png" width="45%">
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/nodebird-api-call_02.png" width="45%">
</div>

## 1. npm 모듈 다운

```
1. npm init
2. npm i nodemon --save-dev
3. npm i axios cookie-parser dotenv express express-session morgan nunjucks
```

## 2. app.js

- ⬇️ Nodebird_API_Call/app.js

```
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session);
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();

const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use('/', indexRouter);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중..');
});
```

## 3. 에러페이지(/views/error.html)

- ⬇️ Nodebird_API_Call/views/error.html

```
<h1>에러</h1>
<h2>{{message}}</h2>
<h3>{{error.status}}</h3>
<h3>{{error.stack}}</h3>
```

## 4. .env 파일에 COOKIE_SECRET, CLIENT_SECRET 작성

- ⬇️ Nodebird_API_Call/.env

```
COOKIE_SECRET=쿠키key
CLIENT_SECRET=domains테이블 client_secret
```

## 5. 실행(/routes, /controllers)

- ⬇️ Nodebird_API_Call/routes/index.js

  ```
  const express = require('express');
  const{ test } = require('../controllers');

  const router = express.Router();

  /* POST     /test */
  router.get('/test', test);

  module.exports = router;
  ```

- ⬇️ Nodebird_API_Call/controllers/index.js

  ```
  const axios = require('axios');

  exports.test = async (rea, res, next) => {  // 토큰 테스트 라우터
      try{
            // 세션에 토큰이 없으면 토큰 발급
            if(!req.session.jwt){

                // 토큰 생성
                const tokenResult = await axios.post('http://localhost:8002/v1/token', {
                    clientSecret: process.env.CLIENT_SECRET,
                });

                // 세션에 토큰 저장
                if(tokenResult.data?.code === 200){  // tokenResult.data && tokenResult.data.code 토큰 발급 성공
                    req.session.jwt = tokenResult.data.token;

                }else{
                    return res.json(tokenResult.data);  // 토큰 발급 실패 사유 응답
                }
          }

          // 발급받은 토큰 테스트
          const result = await axios.get('http://localhost:8002/v1/test',{
            headers: { authorization : req.session.jwt },
          });

          return res.json(result.data);

      }catch(err){
        console.error(err);

        // 토큰 만료시
        if(err.response?.status === 419){   // err.response && err.response.status
            return res.json(err.response.data);
        }

        return next(err);
      }
  }
  ```
