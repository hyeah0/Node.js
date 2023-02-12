// 써드파티 미들웨어
// Morgan 사용자에게 요청을 받을 때마다 log 생성

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.send('morgan');
})

app.listen(3000,()=>{ console.log('morgan')});

// GET / 200 1.661 ms - 6