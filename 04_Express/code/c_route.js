// route : 경로 표시시 중복되는 코드를 줄이기 위함
// package.json : start 값 변경시 터미널에 [npm start] 로 다시 시작하기

import express from 'express';
import postRouter from './router/post.js';  // 설정된 router 가져오기
import userRouter from './router/user.js';

console.log('route');
const app = express();

app.use(express.json()); // REST API -> Body를 읽어올때 json 형태로 읽어오기
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body

// 옵션
const options = {
  dotfiles: 'ignore',               // 숨겨진 파일은 안보이기
  etag: false,
  index: false,
  maxAge: '1d',                     // 캐시 지속 기간
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};

app.use(express.static('public', options)); // 모든 리소스 접근 가능하다. 옵션도 설정 가능

app.use('/posts', postRouter);  // 큰 도메인 posts 가 있다.
app.use('/users', userRouter);  // 큰 도메인 users 가 있다.

app.listen(8080);
