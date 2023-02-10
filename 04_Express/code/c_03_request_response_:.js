// request 응답 종류, wildcard >>> :key명
// response 응답 종류
// header 세팅

const express = require('express');
const app = express();

app.set('port', process.env.PORT||3000);

/* ------------------------------------------------------------------------------- */
// request 응답 종류, wildcard >>> :key명
/* ------------------------------------------------------------------------------- */
app.get('/test/:id',(req, res)=>{
    
    console.log('-- http://localhost:3000/test/Emliy?name=kk --')
    console.log(req.path);          // /test/Emliy
    console.log(req.headers);       // ...
    console.log(req.body);          // undefined
    console.log(req.params);        // { id: 'Emliy' }
    console.log(req.params.id);     // Emliy
    console.log(req.query);         // { name: 'kk' }
    console.log('-----------------------------------------------')
    
    res.status(201).send('http://localhost:3000/test/Emliy?name=kk');
})

/* ------------------------------------------------------------------------------- */
// response 응답 종류
/* ------------------------------------------------------------------------------- */
app.get('/response',(req, res)=>{
    
    // res.status(400);
    // res.status(상태번호).send('응답메세지');
    // res.send('response!');
    // res.sendFile('파일주소');
    // res.json({name : 'Emily'});

    // res.send, sendFile은 한개만 사용 가능 하다.
    // [return]을 붙여 사용할 수 도 있다. 예시)return res.send(); 
    res.status(200).send('status(상태번호) 는 생략 가능하다.');

});

/* ------------------------------------------------------------------------------- */
// header setting
/* ------------------------------------------------------------------------------- */
app.get('/setHead',(req, res)=>{
    //res.setHeader('key','value');
    res.setHeader('haha','hoho');
    res.status(201).send('set header');
});


app.listen(app.get('port'),()=>{
    console.log('3000 익스프레스 서버 실행');
});