## express 미들웨어란?

- 애플리케이션의 req, res 객체에 대한 접근 권한을 갖고 변형 가능
- 미들웨어 스택 내 다음 미들웨어 함수에 대한 접근 권한을 next라는 인자로 갖는 함수
- next 호출을 통해 다음에 있는 미들웨어를 실행하도록 결정 가능
- 위에서 부터 아래로 코드가 실행 된다.
- app.use(미들웨어), app.특정메서드(미들웨어) 로 사용된다.
- 만약 모든 메서드 또는 특정 url에 동일한 코드가 실행되어야할때 미들웨어를 사용 할 수 있다.(중복 코드 방지)

## 미들웨어 종류

1. 애플리케이션 레벨
2. 라우터 레벨
3. 오류 처리
4. 기본 제공 (express.static)
5. 써드파티 미들웨어(morgan, helmet... etc)

### 1. 애플리케이션 레벨

- app.use()나 app.메서드() >>> 메서드 예시 app.get, app.post 함수를 이용해
  <br>미들웨어를 app 인스턴스에 바인딩하는 미들웨어이다.
- 따로 경로가 없는 미들웨어 함수는 앱이 요청을 수신할 때마다 실행 한다.

```
- 경로 없음
app.get((req, res, next) => {
  console.log('Not Found');
});
```

- [애플리케이션 레벨 참고 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_1.js)
- [next 함수 실행 순서 참고 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_2_next.js)

### 2. 라우터 레벨

- `const router = express.Router()`
- Router 객체를 생성한뒤 router.use()나 router.METHOD() 함수를 이용해 로드할 수 있다.
- app.use()같은 메서드를 이용해야 사용할 수 있다.
- 특정 Root URL을 기점으로 기능이나 로직 별 라우팅을 나누어 관리할 수 있는 장점이 있다.

- <h4>예시 코드</h4>
    - 2개의 파일

  1. [c_04_middleware_2_route](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_2_route.js) >>> app.use() 메서드를 이용
  2. router 폴더안에 [post.js](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/router/post.js) >>> Router객체 생성 후 로드

  - 실행 화면

  - localhost:8080/posts/ 일때

      <img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/middleware_route.png" width="100%">

  ```
  -- c_04_middleware_2_route.js --------------------------------
  import express from 'express';
  import postRouter from './router/post.js';  // 설정된 router 가져오기

  const app = express();
  app.use('/posts', postRouter);              // 큰 도메인 posts 가 있다.
  app.listen(8080);

  -- ./router/post.js -------------------------------------------
  import express from 'express';

  const router = express.Router();
  router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
  });
  export default router;
  ```

### 3. 오류 처리

- 에러 핸들링 미들웨어는 항상 4개의 매개변수가 필요하다 (err, req, res, next)
- `console.log(err.stack)` 또는 `console.error(err);` 으로 에러 메시지를 볼 수 있다.
- ❗️주의❗️ 오류 처리 미들웨어는 app.use() 및 라우트 호출을 정의한 뒤 거의 코드의 맨 끝에 정의하기 (모든 오류를 잡는 미들웨어)
- try{} catch{} 로 다른 에러마다 오류 처리 미들웨어 함수를 정의할 수도 있다.
- next(err)를 해줘야 오류 처리 미들웨어로 넘어갈 수 있다.

  ```
  const express = require('express');
  const app = express();

  app.get('/errorHandle',(req, res, next)=>{
      try{
          console.log(abcde);
      }catch(error){
          ⭐️next(error);⭐️
      }
  })

  // ⭐️ 에러핸들링
  app.use((err, req, res, next)=>{

      console.error(err); //ReferenceError: abcde is not defined

      res.status(500).send('Sorry, try later!');
      // 따로 status() 상태를 지정하지 않으면 200으로 반환된다.
  })

  app.listen(3000, ()=>{ console.log('에러')});
  ```

  - ㄴ [상세 코드 참고](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_04_middleware_4_error.js)

### 4. 기본 제공 (express.static)

- 정적 리소스를 제공할 루트 디렉토리를 정하는 express.static 같은 것이 있다.
- 정적 파일을 전달해주는데, 여기서는 /public 디렉토리가 정적 파일들이 모여 있는 루트 디렉토리가 된다.
- 서버의 폴더 경로와 요청경로가 달라 외부인이 서버의 구조를 쉽게 파악할 수 없어 <b>보안에 큰 도움이 된다.</b>
- 정적 파일은 알아서 제공, fs.readFile로 파일을 직접 일어서 전송할 필요가 없다.
  - 요청 경로에 해당하는 파일이 없으면 알아서 next 를 호출 한다. 파일이 있다면 다음 미들웨어는 실행되지 않는다.

```
app.use('요청경로', express.static('실제경로'));
app.use('/', express.static(__dirname + '/public'));
```

### 5. 써드파티 미들웨어(morgan, helmet... etc)

- 써드파티 미들웨어는 npm 에서 설치한 helmet이나 cookie-parser 같은 모듈들이 해당이 된다.
- express 자체적으로 제공하지 않고 따로 설치해야 하는 것들은 다 써드파티 라고 보면 된다.

- [써드파티 상세정리]()
