## Express 란?

- Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는<br>
  간결하고 유연한 Node.js 웹 애플리케이션 프레임워크이다.

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

## - 미들웨어 상세

- [미들웨어 상세 정리](https://github.com/hyeah0/Node.js/blob/main/04_Express/READ_middleware.md)
