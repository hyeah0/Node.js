# API 서버 만들기 01

- [API 01](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_1.md) : 로그인한 사용자 정보 조회 가능
  - [API 01 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_1_call.md)
- [API 02](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_2.md) : 내가 올린 포스트와 해시태그 검색 결과 확인 가능
  - [API 02 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_2_call.md)

# 화면

<div>
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/a_md_img/nodebird-api_01.png" width="45%">
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/a_md_img/nodebird-api_02.png" width="45%">
</div>

## 1. npm 모듈 다운

```
1. npm init
2. npm i nodemon --save-dev
3. npm i bcrypt cookie-parser dotenv express express-session morgan mysql2 nunjucks passport passport-kakao passport-local sequelize uuid
```

## 2. Nodebird에서 일부 파일복사

- <b>config, models, passport, middlewares</b> 폴더 & 파일 복사
  - config : 데이터 연결시 비밀번호, 데이터베이스명 작성된 파일
  - models : 테이블 모델
  - passport
    - 로그인시 실행(serializeUser), 요청마다 실행(deserializeUser)
    - 로컬 로그인 전략
    - 카카오 로그인 전략
  - middlewares : 로그인 유무, JWT 토큰확인
    - 공통서비스
    - 양 쪽을 연결하여 데이터를 주고 받을 수 있도록 중간에서 매개 역할을 하는 소프트웨어

## 3. error view, app.js 작성

- ⬇️ nodebird-api/views/error.html

  ```
  <h1>에러페이지</h1>
  <h2>{{message}}</h2>
  <h3>{{error.status}}</h3>
  <h3>{{error.stack}}</h3>
  ```

- ⬇️ nodebird-api/app.js

  ```
  const express = require('express');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const passport = require('passport');
  const morgan = require('morgan');
  const session = require('express-session');
  const nunjucks = require('nunjucks');
  const dotenv = require('dotenv');

  dotenv.config();

  const authRouter = require('./routes/auth');
  const indexRouter = require('./routes');

  const { sequelize } = require('./models');
  const passportConfig = require('./passport');

  const app = express();
  passportConfig();
  app.set('port', process.env.PORT || 8002);
  app.set('view engin', 'html');

  nunjucks.configure('views', {
  express: app,
  watch: true,
  });

  sequelize.sync({force:false})
         .then(()=>console.log('db연결 성공'))
         .catch((err)=>console.log(err));

  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname,'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cookiePasrser(process.env.COOKIE_SECRET));
  app.use(session({
  resave: fasle,
  saveUninitialized: fasle,
  secret: process.env.COOKIE_SECRET,
  cookie: {
     httpOnly: true,
     secure: false,
  }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', authRouter);
  app.use('/', indexRouter);

  app.use((req, res, next)=>{
     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
     error.status = 404;
     next(error);
  });

  // 오류 응답 미들웨어
  app.use((err, req, res, next)=>{
     res.locals.message = err.message;
     res.locals.error = process.env.NODE_ENV != 'production' ? err: {};
     res.status(err.status || 500);
     res.render('error');
  });

  app.listen(app.get('port'), ()=>{
     console.log(app.get('port'), '번 포트에서 대기중');
  });
  ```

## 4. domain 모델 만들기, User 모델에 관계 추가

- ⬇️ nodebird-api/models/domain.js

  ```
  // clientSecret : 다른 개발자들이 NodeBird API를 사용할 때 필요한 비밀키
  // 자료형 UUID : 충돌 가능성이 적은 랜덤 문자열
  const Sequelize = require('sequelize');

  class Domain extends Sequelize.Model{
      static initiate(sequelize){
          Domain.init({
              host: {
                  type: Sequelize.STRING,
                  allowNull: false,
              },
              type:{
                  type: Sequelize.ENUM('free', 'premium'),
                  allowNull: false,
              },
              clientSecret: {
                  type: Sequelize.UUID,
                  allowNull: false,
              },
          },{ sequelize,
                  timestamps: true,
                  paranoid: true,
                  modelName: 'Domain',
                  tableName: 'domains',
          });
      }
      static associate(db){
          db.Domain.belongsTo(db.User);
          // User 기본키 1:n Domain 외래키
      }
  }

  module.exports = Domain;
  ```

  -[UUID 자료형 참고](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/02_Sequelize_2_UUID%EC%9E%90%EB%A3%8C%ED%98%95.md)

- ⬇️ nodebird-api/models/user.js
  ```
  ...
  static associat(db){
      ...
      db.User.hasMany(db.Domain);
  }
  ```

## 5. 화면

- ⬇️ nodebird-api/views/login.html

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API 서버 로그인</title>
  </head>
  <body>
      <!-- 로그인 상태 -->
      {% if user and user.id %}
      <span class="user-name">안녕하세요! {{user.nick}}님!</span>
      <a href="/auth/logout">
          <button>로그아웃</button>
      </a>

      <!-- 도메인 등록 -->
      <fieldset>
          <legend>도메인 등록</legend>
          <form action="/domain" method="post">
              <div>
                  <label for="type-free">무료</label>
                  <input type="radio" id="type-free" name="type" value="free">
                  <label for="type-premium">프리미엄</label>
                  <input type="radio" id="type-premium" name="type" value="premium">
              </div>
              <div>
                  <label for="host">도메인</label>
                  <input type="text" id="host" name="host" placeholder="ex) aaa.com">
              </div>
              <button>저장</button>
          </form>
      </fieldset>

      <!-- 도메인 주소 -->
      <table>
          <tr>
              <th>도메인 주소</th>
              <th>타입</th>
              <th>클라이언트 비밀키</th>
          </tr>
          {% for domain in domains %}
          <tr>
              <td>{{domain.host}}</td>
              <td>{{domain.type}}</td>
              <td>{{domain.clientSecret}}</td>
          </tr>
          {% endfor %}
      </table>

      {% else %}
      <!-- 로그아웃 상태 -->
      <form action="/auth/login" id="login-form" method="post">
          <h2>Nodebird 계정으로 로그인 하세요.</h2>
          <div class="input-group">
              <label for="email">이메일</label>
              <input id="email" type="email" name="email" required autofocus>
          </div>
          <div class="input-group">
              <label for="password">비밀번호</label>
              <input id="password" type="password" name="password" required>
          </div>
          <div>회원가입은 localhost:8001에서 해주세요</div>
          <button id="login" type="submit">로그인</button>
      </form>
      <script>
          window.onload= ()=>{
              if(new URL(location.href).searchParams.get('loginError')){
                  alert(new URL(location.href).searchParams.get('loginError'));
              }
          };
      </script>
      {% endif %}
  </body>
  </html>
  ```

## 6. 실행(/routes, /controllers)

- ⬇️ nodebird-api/routes/index.js

  ```
  const express = require('express');
  const{ renderLogin, createDomain } = require('../controllers/index');
  const{ isLoggedIn } = require('../middlewares');

  const router = express.Router();

  router.get('/', renderLogin);
  router.post('/domain', isLoggedIn, createDomain);

  module.exports = router;
  ```

- ⬇️ nodebird-api/controllers/index.js

  ```
  const{ v4: uuidv4 } = require('uuid');
  const{ User, Domain } = require('../models');

  // 유저정보와 도메인정보
  exports.renderLogin = async(req, res, next)=>{
      try{

          // userid 기준 user 테이블, domain 테이블 이너 조인
          const user = await User.findOne({
              where: {id: req.user?.id|| null},
                  // ⭐️ ㄴ req.user가 있으면 req.user.id, 없을경우 null
                  // ⭐️ where id = req.user.id 또는 where id = null
              include: {model: Domain},
          });

          res.render('login', {
              user,
              domains: user?.Domains,
              // 유저가 있으면 user.Domains 객체, 없을경우 undefined
          });

      }catch(err){
          console.error(err);
          next(err);
      }
  };

  // /domain/*  도메인 생성
  exports.createDomain = async(req, res, next)=>{
      try{
          await Domain.create({
              UserId: req.user.id,
              host: req.body.host,
              type: req.body.type,
              clientSecret: uuidv4(),
          });

          res.redirect('/');

      }catch(err){
          console.error(err);
          next(err);
      }
  };
  ```
