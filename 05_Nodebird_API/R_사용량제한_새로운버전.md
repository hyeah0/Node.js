# 사용량 제한 구현하기 & 새로운 버전 적용하기

- 인증된 사용자여도 과도한 API 사용은 API 서버에 무리가 간다.
- 횟수를 제한에 서버에 트래픽을 줄인다.

<hr>
- 실제 서비스 운영시

- 새로운 버전이 나올경우 전 버전을 바로 닫기보다는 일정기간을 두고 순차적으로 제거한다.

  - 변경된 부분을 사용자가 코드에 반영할 시간이 필요하기 때문

<hr>

# 화면

<div>
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/a_md_img/v1.png" width="45%">
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/a_md_img/v2_02.png" width="45%">
</div>

# 구현하기

- 사용량 제한 추가로 기존 API버전과 호환되지 않는다
- 새로운 v2 라우터 추가
- nodebird_api 에서 사용되는 상태코드 >> [확인 링크]()

## 1. npm 모듈 다운

```
npm i express-rate-limit
```

## 2. 미들웨어 추가

- 요청 횟수 제한
- 새로운 버전 요청

- ⬇️ nodebird-api/middlewares/index.js

  ```
  ...

  const rateLimit = require('express-rate-limit');

  ...

  // ⭐️ 요청 횟수 제한 -------------------------------------------
  exports.apiLimiter = rateLimit({
      windowMs: 60 * 1000,    // 기준시간(60*1000 == 1분)
      max: 1,                 // 허용횟수
      handler(req, res){      // 제한시간 초과시 콜백 함수
          res.status(this.statusCode).json({
              code: this.statusCode,  // 기본값 429
              message: '1분에 한번만 요청 가능합니다.',
          });
      },
  });

  // ⭐️ 새로운 버전 ---------------------------------------------
  exports.deprecated = (req, res) =>{
      res.status(410).json({
          code: 410,
          message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
      })
  }
  ```

## 3. routes, controllers v2 파일 추가

- ⬇️ nodebird-api/routes/v2.js

  ```
  const express = require('express');
  const{ verifyToken, apiLimiter} = require('../middlewares');     // 미들웨어
  const{ createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');

  const router = express.Router();

  /*
      POST    /v2/token
      GET     /v2/test
      GET     /v2/posts/my
      GET     /v2/posts/hashtag/:title
  */
  router.post('/token', apiLimiter, createToken);
  router.get('/test', apiLimiter, verifyToken, tokenTest);
  router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);
  router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

  module.exports = router;
  ```

- ⬇️ nodebird-api/controllers/v2.js

  - 토큰 유효기간을 제외하고는 v1.js 파일과 동일하다.

  ```
  const jwt = require('jsonwebtoken');
  const{ Domain, User, Post, Hashtag } = require('../models');

  /* -----------------------------------------------------------
      POST    /v2/token
  -------------------------------------------------------------- */
  exports.createToken = async (req, res)=>{

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
                  attribute: ['nick', 'id'],
              },
          });

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
              expiresIn: '30m',     // 유효기간 1분
              issuer: 'nodebird',  // 발급자
          });

          // return 값
          return res.json({
              code: 200,
              message: '토큰이 발급되었습니다',
              token,
          });

      }catch(err){
          console.error(err);
          return res.status(500).json({
              code: 500,
              message: '서버에러',
          });
      }
  };

  /* -----------------------------------------------------------
      GET     /v2/test
  -------------------------------------------------------------- */
  exports.tokenTest = (req, res)=>{
      res.json(res.locals.decoded);
  };

  /* -----------------------------------------------------------
      GET     /v2/posts/my
  -------------------------------------------------------------- */
  exports.getMyPosts = (req, res) =>{

      // select * from post where userId = ${res.locals.decoded.id}
      Post.findAll({where: { userId : res.locals.decoded.id }})
          .then((posts)=>{

              // posts == 특정 userid의 글 모두
              console.log(posts);

              res.json({
                  code: 200,
                  payload: posts,
              });
          })
          .catch((err)=>{
              console.error(err);
              return res.status(500).json({
                  code: 500,
                  message: '서버에러',
              });
          });
  };

  /* -----------------------------------------------------------
  GET     /v2/posts/hashtag/:title
  -------------------------------------------------------------- */
  exports.getPostsByHashtag = async (req, res)=>{
      try{
          const hashtag = await Hashtag.findOne({ where: { title: req.params.title }});

          if(!hashtag){
              return res.status(404).json({
                  code: 404,
                  message: '검색 결과가 없습니다.',
              })
          }

          const posts = await hashtag.getPosts();
          return res.json({
              code: 200,
              payload: posts,
          });

      }catch(err){
          console.error(err);
          return res.status(500).json({
              code: 500,
              message: '서버에러',
          });
      }
  };
  ```

## 4. routes/v1 파일 코드 수정(기존 v1 라우터 사용시 경고 메세지)

- 미들웨어에서 작성한 deprecated 사용

- ⬇️ nodebird-api/routes/v1.js

  - 코드 수정 필요

  ```
  const express = require('express');
  ---------------------------------------------------------------------------
  // 👉 수정전
  const{ verifyToken } = require('../middlewares');     // 토큰 내용이 저장된 값

  // 👉 수정후
  const{ verifyToken, deprecated} = require('../middlewares');     // 미들웨어
  ---------------------------------------------------------------------------
  const{ createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

  const router = express.Router();
  ---------------------------------------------------------------------------
  // 👉 코드 추가
  router.use(deprecated);
  ---------------------------------------------------------------------------
  ...
  ```

## 5. 새로 만든 라우터(v2)를 서버와 연결(app.js)

- ⬇️ nodebird-api/app.js

```
...
const v1 = ...
// 👉 추가
const v2 = require('./routes/v2');

...

app.use('v1', v1);
// 👉 추가
app.use('v2', v2);
```

## 6. api를 불러오는 서버에서 새로생긴 버전 호출하기

- ⬇️ nodebird-api-call/.env

```
// 👉 수정전
API_URL=http://localhost:8002/v1

// 👉 수정후
API_URL=http://localhost:8002/v2
```
