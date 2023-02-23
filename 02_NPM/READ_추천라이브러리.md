## - 추천 라이브러리

<table>
<tr><td>nodemon</td><td>코드 수정시 자동 재시작</td></tr>
<tr><td>express-async-error</td><td>비동기적 코드 실행시 발생하는 에러 처리시 <br>.catch()로 사용해야하는 부분을 외부에서 에러 처리 가능하게 해줌</td></tr>
</table>

### - nodemon

- `npm view nodemon` >>> node를 끊임없이 동작하면서 파일변경시 재시작
- 순서
  1. 터미널에 `npm init --yes`
  2. `npm i nodemon` 다운
  - 전역 다운시 `npm i nodemon -g`
  3. package.json 파일 "scripts" 에 "start" 기입
     <br> `"start" : "nodemon 실행파일명"`
  4. `npm start` 입력
  5. 3번단계에서 입력했던 실행파일이 업데이트 될때마다 자동으로 재시작 된다.
