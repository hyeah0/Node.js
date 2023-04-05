# 통합테스트 하기

위치 : <b>routes</b>
<br>테스트 파일 : auth.js
<br>

<hr>

## 통합테스트 설정

### 0. supertest 설치

- supertest : 슈퍼 에이전트(superagent)를 기반으로한 HTTP 검증 라이브러리다.

```
npm i -D supertest
```

<br>

### 1. app.js 객체를 모듈로 만들어 분리

- #### 1. app 객체를 모듈로 만든다.

  - ⬇️ app.js

      <pre>
      ...
      // 오류 응답 미들웨어
      app.use((err, req, res, next)=>{
          res.locals.message = err.message;
          res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
          res.status(err.status || 500);
          res.render('error');
      });
      
      // ⬇️ server.js 로 이동
      /** -- 앱 포트에 연결 -- */
      // app.listen(app.get('port'),()=>{
      //    console.log(app.get('port'), '번 포트에서 대기중.. app.js');
      // });
    
      <b>module.exports = app;</b></pre>

    <br>

- #### 2. server.js 파일을 만들어 포트리스닝 코드 작성

  - ⬇️ server.js

    ```
    const app = require('./app');

    /** -- 앱 포트에 연결 -- */
    app.listen(app.get('port'),()=>{
        console.log(app.get('port'), '번 포트에서 대기중.. app.js');
    });
    ```

    <br>

### 2. package.json npm start 명령어 수정

- ⬇️ package.json

    <pre>
    ...
    <b>"main"</b>: "app.js" >> <b>"server.js"</b>,
    "scripts": {
    <b>"start"</b>: "nodemon app" >> <b>"nodemon server"</b>,
    "test": "jest",
    "coverage" : "jest --coverage"
    },</pre>

<br>

### 3. 테스트용 데이터 베이스 설정

- 통합테스트에서는 데이터베이스 코드를 모킹하지 않고 실제 테스트 데이터가 저장된다.
- ⭐️ 테스트용 데이터베이스를 따로 만드는 것이 좋다.

  #### 1. 테스트 속성 수정

  - ⬇️ config/config.json

      <pre>
      "test": {
          "username": "root",
          <b>"password"</b>: null  >> <b>비밀번호</b>,
          <b>"database"</b>: "database_test" >> <b>nodebird_test</b>,
          "host": "127.0.0.1",
          "dialect": "mysql"
      },</pre>

    <br>

  #### 2. 데이터베이스 생성

    <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_01_create_db_01.png" width="80%">

    <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_01_create_db_02.png" width="80%">

  - 터미널

    ```
    npx sequelize db:create --env test
    ```

    <br>
    <hr>

## 테스트 코드 작성

### 1. 회원 가입 테스트 코드 작성

- routes/auth.test.js 파일 생성

  - ⬇️ routes/auth.test.js

    <pre>
    // ⭐️1
    <b>const request = require('supertest')</b>;
    const { sequelize } = require('../models/index');
    const app = require('../app');
    
    // ⭐️2
    <b>beforeAll</b>(async ()=>{
        await sequelize.sync();
    });
    
    // ⭐️3
    describe('POST /auth/login 로컬 로그인 테스트 그룹',()=>{
        test('로그인 테스트', (done)=>{
            <b>request(app)</b>.post('/auth/login')
                        .send({
                            email: 'abc@abc.com',
                            password: 'password',
                        })
                        .expect('Location', '/')
                        .expect(302, done);
        });
    });
    </pre>

    - ⭐️1. request 변수에 슈퍼테스트 모듈을 담는다.

      - supertest 를 사용하면 app.listen 수행하지 않고 서버 라우터를 실행할 수 있다.

    - ⭐️2. beforeAll 함수

      - 모든 테스트를 실행하기 전에 수행해야 할 코드
      - sequelize.sync() > 데이터 베이스에 테이블을 생성합니다.

      - <table>
            <tr><td>beforeAll</td><td>모든 테스트를 실행 전 수행</td></tr>
            <tr><td>beforeEach</td><td>각각의 테스트 수행 전 수행</td></tr>
            <tr><td>afterAll</td><td>모든 테스트가 끝난 후 수행</td></tr>
            <tr><td>afterEach</td><td>각각의 테스트 수행 후 수행</td></tr>
        </table>

    - ⭐️3.

      ```
      request(app).post('/auth/login')          -------------- ⓵
                  .send({                       -------------- ⓶
                      email: 'abc@abc.com',
                      password: 'password',
                  })
                  .expect('Location', '/')      -------------- ⓷
                  .expect(302, done);
      ```

      - ⓵ request를 불러와 app 객체를 인수로 넣는다.

        - request() : 가상의 서버를 실행하고 api 요청

        - request <== supertest

        - app <== routes/app.js

        - get, post, put, patch, delete 등의 메서드로 원하는 라우터에 요청 보내기

      - ⓶ send({ 보낼 데이터들 })
      - ⓷ 응답 결과가 Location의 헤더가 / 인지, 상태코드가 302인지 테스트
        - request 함수는 비동기 함수로 언제 종료되는지 알 수 없다.
          <br> <b>test 함수의 콜백함수의 매개변수인 done</b>을 expect 메서드의 <b>두번째 인수로 넣어 테스트 마무리를 알림</b>
        - ```
          expect(302, done)
          ```

### 테스트 실패

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_02.png" width="80%">

- 사유 : 테스트용 데이터 베이스에 회원 정보가 없기 때문에
- 해결

  - 로그인 라우터 테스트 하기 전에 회원가입 라우터 테스트 해서 회원정보를 넣어야 한다.

  - ⬇️ routes/auth.test.js

    ```
    const request = require('supertest');
    const { sequelize } = require('../models/index');
    const app = require('../app');

    // 테스트 전 실행
    beforeAll(async ()=>{
        await sequelize.sync();
    });

    // 🍎 회원가입 테스트
    // 🐸 테스트 - 로그인 하지 않았을 경우 가입
    describe('Post /auth/join 회원가입 테스트 그룹', ()=>{

        // 🐸 테스트
        test('로그인 안했으면 가입', (done)=>{
            request(app).post('/auth/join')
                        .send({
                            email: 'abc@abc.com',
                            nick: 'abc',
                            password: '1234',
                        })
                        .expect('Location', '/')    // 경로는 /
                        .expect(302, done);
        });

    });

    // 🍎 로그인 상태 회원가입 요청시 테스트
    // 🐸 사전 - 로그인 먼저 수행
    // 🐸 테스트 - 로그인 되어있는 사용자가 회원가입 요청시
    describe('Post /auth/join 로그인 상태 회원가입 요청시 테스트 그룹', ()=>{

        const agent = request.agent(app);   // request.agent() : 요청을 지속시킬수 있다

        // 🐸 사전 - 로그인 먼저 수행(각 테스트 시작전 수행)
        beforeEach((done)=>{
            agent.post('/auth/login')
                .send({
                    email: 'abc@abc.com',
                    password: '1234',
                })
                .end(done);
        })

        // 🐸 테스트
        test('로그인 이미 한 상태 redirect /', (done)=>{
            const message = encodeURIComponent('로그인한 상태 입니다.');

            agent.post('/auth/join')
                .send({
                    email: 'abc@abc.com',
                    nick: 'abc',
                    password: '1234',
                })
                .expect('Location', `/?error=${message}`)
                .expect(302, done);
        });
    });

    // ⭐️
    afterAll(async ()=>{
        await sequelize.sync({force: true});
    });

    ```

    - ⭐️ 테스트 후 데이터 정리 코드
      ```
      afterAll(async ()=>{
          await sequelize.sync({force: true});
      });
      ```
      - force : true 테이블 다시 만들게 설정

<br>

### 2. 로그인 로그아웃 테스트

- 회원가입 테스트 하단에 이어서 추가 작성

- 로그인 테스트 참고 이미지

  - Nodebird/passport/localStrategy.js
  - Nodebird/controllers/auth.is

      <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_03_login_01.png" width="100%">

    <br>

  - Nodebird/passport/localStrategy.js
  - Nodebird/routes/auth.is

      <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_03_login_02.png" width="100%">

    <br>

  - Nodebird/controllers/auth.is
  - Nodebird/routes/auth.is

      <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test04_auth_03_login_03.png" width="100%">

<br>

- ⬇️ routes/auth.test.js

  ```
  ...
  describe('Post /auth/login 로그인 상태에서 회원가입 테스트 그룹', ()=>{ ... });

  // 🍎 로그인 테스트
  // 🐸 테스트 - 가입되지 않았을 경우
  // 🐸 테스트 - 로그인 수행
  // 🐸 테스트 - 비밀번호 불일치
  describe('POST /auth/login 로그인 테스트 그룹', ()=>{
      // 🐸
      test('가입되지 않은 회원', (done)=>{
          const message = encodeURIComponent('가입되지 않은 회원입니다.');
          request(app)
              .post('/auth/login')
              .send({
                  email: 'ababa@abc.com',
                  password: '1234',
              })
              .expect('Location', `/?loginError=${message}`)
              .expect(302, done);
      });
      // 🐸
      test('로그인 수행', (done)=>{
          request(app)
              .post('/auth/login')
              .send({
                  email: 'abc@abc.com',
                  password: '1234',
              })
              .expect('Location', '/')
              .expect(302, done);
      });
      // 🐸
      test('비밀번호 불일치', (done)=>{
          const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
          request(app)
              .post('/auth/login')
              .send({
                  email: 'abc@abc.com',
                  password: '12345',
              })
              .expect('Location', `/?loginError=${message}`)
              .expect(302, done);
      });
  });

  // 🍎 로그아웃 테스트
  // 🌱 사전 - 로그인 수행
  // 🐸 테스트 - 로그아웃 수행
  describe('POST /auth/logout 로그아웃 테스트 그룹', ()=>{

      const agent = request.agent(app);

      // 🌱
      beforeEach((done)=>{
          agent
              .post('/auth/login')
              .send({
                  email: 'abc@abc.com',
                  password: '1234',
              })
              .end(done);
      });

      // 🐸
      test('로그아웃 수행', (done)=>{
          agent
              .get('/auth/logout')
              .expect('Location', '/')
              .expect(302, done)
      });
  });


  afterAll(async ()=>{
      await sequelize.sync({force: true});
  });


  ```
