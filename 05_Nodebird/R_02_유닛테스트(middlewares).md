# 유닛테스트 하기

위치 : <b>middlewares/index.js</b>
<br>함수 : <b>isLoggedIn, isNotLoggedIn</b>

## 1. 테스트 틀 만들기

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test02.png" width="100%">

- ⬇️ middlewares/index.test.js

  ```
  const { isLoggedIn, isNotLoggedIn } = require('./');

  // ⭐️ 테스트 그룹 1
  describe('isLoggedIn 함수 테스트 그룹', ()=>{

      // 🐸 테스트 1.
      test('로그인시 isLoggedIn 함수가 next를 호출해야한다.', ()=>{

      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isLoggedIn 함수가 에러를 응답해야한다.', ()=>{

      })

  });

  // ⭐️ 테스트 그룹 2
  describe('isNotLoggedIn 함수 테스트 그룹', ()=>{

      // 🐸 테스트 1.
       test('로그인되어 있으면 isNotLoggedIn 함수가 에러를 응답해야한다.', ()=>{

      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isNotLoggedIn 함수가 next를 호출해야한다.', ()=>{

      })

  });
  ```

## 2. 테스트 할 코드에 있는 인수를 가짜 객체, 함수를 만들어 대체한다.

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test02_isLoggedIn_01.png" width="100%">

- 모킹(mocking) : 가짜 객체, 가짜 함수를 넣는 행위
  - 테스팅 실행전에 모킹 객체 선언 필요
- 함수를 모킹시 <b>jest.fn</b> 메서드 사용

  - jest.fn(()=>반환값)

    ```
    const req = { isAuthenticated: jest.fn(()=>true) };

    ==> req = { isAuthenticated: true }
    ```

- <details>
    <summary>코드</summary>

  ```
  const { isLoggedIn, isNotLoggedIn } = require('./');

  // ⭐️ 테스트 그룹 1
  describe('isLoggedIn 함수 테스트 그룹', ()=>{

      // 🍎 res 객체
      const res = {
          status: jest.fn(()=>res),
          send: jest.fn(),
          redirect: jest.fn()
      };

      // 🍎 next 객체
      const next = jest.fn();

      // 🐸 테스트 1.
      test('로그인시 isLoggedIn 함수가 next를 호출해야한다.', ()=>{

          // 🍎 req 객체
          const req = { isAuthenticated: jest.fn(()=>true) };

      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isLoggedIn 함수가 에러를 응답해야한다.', ()=>{

          // 🍎 req 객체
          const req = { isAuthenticated: jest.fn(()=>true) };

      })

  });

  // ⭐️ 테스트 그룹 2
  describe('isNotLoggedIn 함수 테스트 그룹', ()=>{

      const res = { redirect: jest.fn() };
      const next = jest.fn();

      // 🐸 테스트 1.
      test('로그인되어 있으면 isNotLoggedIn 함수가 에러를 응답해야한다.', ()=>{

          const req = { isAuthenticated: jest.fn(()=>true) };

      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isNotLoggedIn 함수가 next를 호출해야한다.', ()=>{
          const req = { isAuthenticated: jest.fn(()=>false) };
      })

  });
  ```

</details>

## 3. 함수 실행, 결과값 확인

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test02_isLoggedIn_02.png" width="100%">

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test02_isLoggedIn_03.png" width="100%">

- <details>
    <summary>코드</summary>

  ```
  const { isLoggedIn, isNotLoggedIn } = require('./');

  // ⭐️ 테스트 그룹 1
  describe('isLoggedIn 함수 테스트 그룹', ()=>{

      // res 객체
      const res = {
          status: jest.fn(()=>res),
          send: jest.fn(),
          redirect: jest.fn()
      };

      // next 객체
      const next = jest.fn();

      // 🐸 테스트 1.
      test('로그인시 isLoggedIn 함수가 next를 호출해야한다.', ()=>{
          // req 객체
          const req = { isAuthenticated: jest.fn(()=>true) };

          // 🍎 함수 호출 및 확인
          isLoggedIn(req, res, next);
          expect(next).toBeCalledTimes(1);
      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isLoggedIn 함수가 에러를 응답해야한다.', ()=>{
          // req 객체
          const req = { isAuthenticated: jest.fn(()=>true) };

          // 🍎 함수 호출 및 확인
          isLoggedIn(req, res, next);

          // res.status(403).send('로그인 필요');
          // expect(res,status).toBeCalledWith(403);
          // expect(res.send).toBeCalledWith('로그인 필요');

          // res.redirect('/');
          expect(res.redirect);
      })
  });

  // ⭐️ 테스트 그룹 2
  describe('isNotLoggedIn 함수 테스트 그룹', ()=>{

      const res = { redirect: jest.fn() };
      const next = jest.fn();

      // 🐸 테스트 1.
      test('로그인되어 있으면 isNotLoggedIn 함수가 에러를 응답해야한다.', ()=>{

          const req = { isAuthenticated: jest.fn(()=>true) };

          isNotLoggedIn(req, res, next);

          const message = encodeURIComponent('로그인한 상태 입니다.');
          expect(res.redirect).toBeCalledWith(`/?error=${message}`);

      });

      // 🐸 테스트 2.
      test('로그인되어있지 않으면 isNotLoggedIn 함수가 next를 호출해야한다.', ()=>{

          const req = { isAuthenticated: jest.fn(()=>false) };

          isNotLoggedIn(req, res, next);

          expect(next).toHaveBeenCalledTimes(1);
      })

  });
  ```

</details>
