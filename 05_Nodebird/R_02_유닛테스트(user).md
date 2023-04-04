# 유닛테스트 하기

위치 : <b>controllers/user.js</b>
<br>함수 : <b>follow</b>
<br>url : <b>/user/:id/follow</b>
<br>1. req.user.id 기준 사용자 정보가 있으면
<br>2. 팔로잉 목록에 req.params.id를 저장한다.

<br>

## 1. 테스트 틀 만들기

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_01.png" width="100%">

```
const { follow } = require('./user');

// ⭐️ 테스트 그룹 1
describe('follow 테스트 그룹', ()=>{

    // 🐸 테스트 1. >> if true 일때
    test('사용자를 찾아 팔로잉 추가 후 success 응답', async () => {
        // await
    });

    // 🐸 테스트 2. >> if false 일때
    test('사용자를 못 찾으면 res.status(404), send("no user")를 호출', async () => {
        // await
    });

    // 🐸 테스트 3. >> catch(err) 일때
    test('DB에서 에러 발생시 next(error)호출', async () => {
        // await
    });

})
```

<br>

## 2. 테스트 할 코드에 있는 인수를 가짜 객체, 함수를 만들어 대체한다.

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_02.png" width="100%">

- <details>
    <summary>코드</summary>

  ```
  const { follow } = require('./user');

  // ⭐️ 테스트 그룹 1
  describe('follow 테스트 그룹', ()=>{

      // 가정 : 유저id 1이 유저id 2를 팔로우
      const req = {
          user: {id: 1},  // 테스트용 임시
          params: {id: 2} // 테스트용 임시
      }

      const res = {
          status: jest.fn(()=>res),
          send: jest.fn()
      }

      const next = jest.fn();

      // 🐸 테스트 1. >> if true 일때
      test('사용자를 찾아 팔로잉 추가 후 success 응답', async () => {
          // await
      });

      // 🐸 테스트 2. >> if false 일때
      test('사용자를 못 찾으면 res.status(404), send("no user")를 호출', async () => {
          // await
      });

      // 🐸 테스트 3. >> catch(err) 일때
      test('DB에서 에러 발생시 next(error)호출', async () => {
          // await
      });

  });

  ```

</details>

<br>

## 3. 함수 실행, 결과값 확인

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_03.png" width="100%">

- <details>
    <summary>코드</summary>

  ```
  const { follow } = require('./user');

  // ⭐️ 테스트 그룹 1
  describe('follow 테스트 그룹', ()=>{

      // 가정 : 유저id 1이 유저id 2를 팔로우
      const req = {
          user: {id: 1},  // 테스트용 임시
          params: {id: 2} // 테스트용 임시
      }

      const res = {
          status: jest.fn(()=>res),
          send: jest.fn()
      }

      const next = jest.fn();

      // 🐸 테스트 1. >> if true 일때
      test('사용자를 찾아 팔로잉 추가 후 success 응답', async () => {
          await follow(req, res, next);
          expect(res.send).toBeCalledWith('팔로우 성공');
      });

      // 🐸 테스트 2. >> if false 일때
      test('사용자를 못 찾으면 res.status(404), send("no user")를 호출', async () => {
          await follow(req, res, next);
          expect(res.status).toBeCalledWith(404);
          expect(res.send).toBeCalledWith('no user');
      });

      // 🐸 테스트 3. >> catch(err) 일때
      test('DB에서 에러 발생시 next(error)호출', async () => {
          const message = 'DB에러';
          await follow(req, res, next);
          expect(next).toBeCalledWith(message);
      });

  });
  ```

</details>

## ⭐️ 3번까지 진행시 결과 실패

<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_04.png" width="100%">

### - 사유

- User 모델 때문이다.
- follow 컨트롤러 안에 User 모델이 들어있는데 실제 데이터 베이스와 연결 되어있어
  <br> 테스트 환경에서는 사용할 수 없다.

### - 설명

```
jest.mock('모킹할 모듈의 경로')
const User = require('모델 경로')

jest.mock('../models/user');
const User = require('../models/user');
```

- jest.mock 메서드에 모킹할 모듈의 경로를 인수로 넣고 모듈 불러오기

  - <b>해당 모듈(User)의 메서드는 모두 가짜 메서드가 된다.</b>
  - 예시)

    - User.findOne 등은 가짜 메서드가 된다.

  - 가짜 메서드에는 <b>mockReturnValue</b> 등의 메서드가 생긴다.

  - mockReturnValue 메서드로 User.findOne의 가짜 반환값을 지정 할 수 있다.
    ```
    User.findOne.mockReturnValue(가짜 반환값);
    ```

### - 코드

- <details>
       <summary>코드</summary>

  ```
  // 🍎 user 모킹
  jest.mock('../models/user');
  jest.mock('../models/post');
  jest.mock('../models/hashtag');
  const User = require('../models/user');
  const Post = require('../models/post');
  const Hashtag = require('../models/hashtag');

  const { follow } = require('./user');

  // ⭐️ 테스트 그룹 1
  describe('follow 테스트 그룹', ()=>{

      // 가정 : 유저id 1이 유저id 2를 팔로우
      const req = {
          user: {id: 1},  // 테스트용 임시
          params: {id: 2} // 테스트용 임시
      }

      const res = {
          status: jest.fn(()=>res),
          send: jest.fn()
      }

      const next = jest.fn();

      // 🐸 테스트 1. >> if true 일때
      test('사용자를 찾아 팔로잉 추가 후 success 응답', async () => {

          // 🍎 user
          User.findOne.mockReturnValue({
              addFollowing(id){
                  return Promise.resolve(true);
              }
          });

          await follow(req, res, next);
          expect(res.send).toBeCalledWith('팔로우 성공');
      });

      // 🐸 테스트 2. >> if false 일때
      test('사용자를 못 찾으면 res.status(404), send("no user")를 호출', async () => {

          // 🍎 user
          User.findOne.mockReturnValue(null);

          await follow(req, res, next);
          expect(res.status).toBeCalledWith(404);
          expect(res.send).toBeCalledWith('no user');
      });

      // 🐸 테스트 3. >> catch(err) 일때
      test('DB에서 에러 발생시 next(error)호출', async () => {

          const message = 'DB에러';

          // 🍎 user
          User.findOne.mockReturnValue(Promise.reject(message));

          await follow(req, res, next);
          expect(next).toBeCalledWith(message);
      });

  });

  ```

   </details>

### - 결론

- <b>User 모델을 모킹 해야한다.</b>

- User 모델만 모킹할경우 에러 발생으로 <b>post, hashtag 모델도 같이 모킹한다.</b>

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_05.png" width="100%">
  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_06.png" width="100%">

### - 테스트 성공

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test03_follow_07.png" width="100%">

<br>

## ❓ 유닛테스트 적합?

- 실제 데이터 베이스에 팔로잉 등록하는 테스트가 아님으로 실제 데이터 베이스에 문제가 발생할 수 있다.
- 따라서 다른종류의 테스트 진행 해야하한다.
  - <b>통합 테스트</b>나 <b>시스템 테스트</b>를 하곤 한다.
