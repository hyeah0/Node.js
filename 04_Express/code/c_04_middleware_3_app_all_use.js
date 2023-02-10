/* middleware
    미들웨어         : app.use((req, res, ⭐️next⭐️) => { ⭐️next()⭐️ });  
    에러 처리 미들웨어 : app.use((⭐️err⭐️, req, res, next) => {});

    app.all vs app.use
*/

const express = require('express');
const app = express();

/* ------------------------------------------------------------------------------- */
// app.all vs app.use
/* ------------------------------------------------------------------------------- */
// app.all : 
// /appall 만 수행
// /appall/abc 는 수행 안함
// /appall/* 로 보완 가능
app.all('/appall',(req, res, next)=>{
    console.log('app.all');
    next();
})

// app.use : 
// /appuse 뒤에 어떤 것이 와도 수행
// /appuse/abc 와도 수행
app.use('/appuse',(req, res, next)=>{
    console.log('app.use');
    next();
})

// 경로가 어찌하던 실행
app.use((req, res, next)=>{
    res.send('last')
})

app.listen(3000, ()=>{ console.log('app.all vs app.use')});