# JWT(JSON Web Token)

- Json 형식의 데이터를 저장하는 토큰
- [쿠키, 세션, JWT 상세 참고](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/tree/main/COOKIE_SESSION_JWT)

## - JWT 구현

### 1. JWT 모듈 설치

```
npm i jsonwebtoken
```

<br>

### 2. 미들웨어 만들기(/middlewares)

- 다른 사용자가 API를 쓰려면 JWT 토큰을 발급받고 인증 받아야한다.
- 대부분 라우터에 공통되어 미들웨어로 만들어 두기

- ⬇️ nodebird-api/.env

  ```
  JWT_SECRET=jwtSecret
  ```

- ⬇️ nodebird-api/middlewares/index.js

  ```
  const jwt = require('jsonwebtoken');
  ...
  exports.verifyToken = (req, res, next)=>{
      try{
          res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
          return next();

      }catch(err){
          if(err.name === 'TokenExpiredError'){   // 유효기간 초과
              return res.status(419).json({
                  code: 419,  // 유효기간 초과시 419 상태코드 응답, 400번대에서 마음대로 선택 가능
                  message: '토큰이 만료되었습니다.',
              });
          }
      }

      return res.status(401).json({
          code:401,
          message: '유효하지 않은 토큰입니다.',
      });
  }
  ```

  - jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

    - req.headers.authorization : 요청 헤더에 저장된 토큰
    - process.env.JWT_SECRET : 토큰의 비밀키

  - 인증에 성공한 경우 <b>res.locals.decoded</b> 에 토큰 내용이 저장된다.

<br>

### 3. 토큰의 내용물 사용(/routes, /controllers)

- routes의 이름은 v1(버전1)로 버전이 정해진 후에는 함부로 라우터를 수정하면 된다.
  - 다른 사람, 서비스가 기존 API를 사용하기 때문이다.
  - API 서버의 코드를 변경시 API를 사용 중인 다른 사람에게도 영향을 미친다.
  - 특히 기존 라우터를 수정될 경우 API를 사용하는 프로그램들이 오작동 될 수 있다.
- 라우터를 수정해야할 경우

  - 버전을 올린 라우터를 새로 추가 하고(v2, v3...) 이전 버전 사용자에게 새로운 버전이 나온것을 공유한다.

- 버전을 라우터에 표시할 필요는 없다. (헤더, 쿼리스트링, 본문에 버전을 표시 할 수 있다.)

- ⬇️ nodebird-api/routes/v1.js

  ```
  const express= require('express');

  const{ verifyToken } = require('/middlewares');
  //ㄴ 토큰 내용이 저장된 값
  const{ createToken, tokenTest } = require('../controllers/v1');

  const router = express.Router();

  /*
      POST    /v1/token
      GET     /v1/test
  */
  router.post('/token', createToken);
  router.get('/test', verifyToken, tokenTest);

  module.exports = router;
  ```

- ⬇️ nodebird-api/controllers/v1.js

  ```
  const jwt = require('jsonwebtoken');
  const{ Domain, User } = require('../models');

  exports.createToken = async(req, res)=>{
      const { clientSecret } = req.body;
      try{
            // 도메인 정보
            /*
                select d.* , u.nick, u.id
                  from domains d
                  join users u
                    on d.UserId = u.id
                  where d.clientSecret = ${clientSecret}
            */

            const domain = await Domain.findOne({
                where: {clientSecret},
                include: {
                    model: User,
                    attribute: ['nick', 'id],
                }

            // 등록되지 않은 도메인일 경우
            if(!domain){
                return res.status(401).json({
                    code: 401,
                    message: '등록되지 않은 도메인입니다. 도메인 먼저 등록해주세요',
                });
            }

            // 토큰 발급
            const token = jwt.sign({
                id: domain.User.id,
                nick: domain.User.nick,
            },process.env.JWT_SECRET,
            {
                expireIn: '1m',     // 유효기간 1분
                issuer: 'nodebird'  // 발급자
            });

            // return 값
            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다',
                tocken,
            })

          });

      }catch(err){
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버에러',
        });
      }
  };

  exports.tokenTest = (req, res)=>{
    res.json(res.locals.decoded);
  }

  ```

- ```
  const token = jwt.sign({
                  id: domain.User.id,
                  nick: domain.User.nick,
              },process.env.JWT_SECRET,
              {
                  expireIn: '1m',     // 유효기간 1분
                  issuer: 'nodebird'  // 발급자
              });
  ```
  - jwt.sing({ 토큰의 내용 }, 토큰의 비밀키 ,{ 토큰 설정 })
  - 토큰 유효기간 시간은 60\*1000 밀리초 단위로도 적어도 된다.

### 4. 라우터 서버에 연결(app.js)

- ⬇️ nodebird-api/app.js

  ```
  dotenv.config();
  // 아래 입력

  const v1 = require('./routes/v1');

  app.use('/v1', v1);

  ```
