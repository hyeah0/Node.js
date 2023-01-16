## Express 란?

- Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크이다.

## - Express 로 서버 만들기

```
// package.json - type : module 일때
import express from 'express';
const app = express();

// package.json - type : commonjs 일때
const express = require('express')
const app = express()

//app.[get]('Url/Path',function(request, response, next){}
// [get, post, put, delete, all, use] 사용 가능


// Read
app.get('/posts',function(request, response, next){
    response.send(...)
})

// Create
app.post('/posts',function(request,response,next){
    response.send(...)
})

// Update
app.put('/posts',function(request,response,next){
    response.send(...)
})

// Delete
app.delete('/posts',function(request,response,next){
    response.send(...)
})

app.all('/posts',function(request, response, next){
    response.send(...)
})

app.use('/posts',function(request, response, next){
    response.send(...)
})

app.listen(8080)
```

## - route

- Url/Path을 경로 표시시 중복되는 코드를 줄이기 위함

```
// c_route.js ---------------------------------------
// 경로가 지정된 파일을 가져오기
import postRouter from './router/post.js';  // 설정된 router 가져오기
import userRouter from './router/user.js';

// 큰 도메인 설정
app.use('/posts', postRouter);
app.use('/users', userRouter);

// ./router/post.js  --------------------------------
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts');
});

export default router;

// ---------------------------------------------------
// localhost:8080/posts/ >>> status 201 반환 하고 화면에는 GET: /posts 가 출력된다.

```

- [상세 c_route.js 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/c_route.js)
- [상세 post.js 코드](https://github.com/hyeah0/Node.js/blob/main/04_Express/code/router/post.js)
