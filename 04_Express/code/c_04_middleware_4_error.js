/* middleware
    미들웨어         : app.use((req, res, ⭐️next⭐️) => { ⭐️next()⭐️ });  
    에러 처리 미들웨어 : app.use((⭐️err⭐️, req, res, next) => {});

    next(new Error('error'))    : 에러 던지기(에러 핸들러도 만들어야 한다.)
*/

const express = require('express');
const app = express();

app.get('/throwError',(req, res, next)=>{
    next(new Error('error'));  
})

app.get('/errorHandle',(req, res, next)=>{
    try{
        console.log(abcde);
    }catch(error){
        next(error);             
    }
})

// 에러 핸들링
app.use((error, req, res, next)=>{
    
    // /throwError  >>> Error: error
    // /errorHandle >>> ReferenceError: abcde is not defined
    console.error(error);

    // 따로 status() 상태를 지정하지 않으면 200으로 반환된다.
    res.status(500).send('Sorry, try later!');
})

app.listen(3000, ()=>{ console.log('에러')});