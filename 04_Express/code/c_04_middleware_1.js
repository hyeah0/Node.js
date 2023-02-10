/* middleware
    미들웨어         : app.use((req, res, ⭐️next⭐️) => { ⭐️next()⭐️ });  
    에러 처리 미들웨어 : app.use((⭐️err⭐️, req, res, next) => {});

    app.use((req, res, next) => { next() });            : 모든 메서드에서 실행
    app.use('/abc', (req, res, next) => { next() });    : url이 /abc로 시작하는 요청에서 미들웨어 실행
    app.메서드('/', (req, res, next)) => { next() });     : 특정 메서드 요청에서 미들웨어를 실행 (get, post..)
    app.post('/abc', (req, res, next) => { next() });   : url이 /abc로 시작하고 post 요청에서 미들웨어를 실행
*/

const express = require('express');
const app = express();

app.set('port', process.env.PORT||3000);

/* ------------------------------------------------------------------------------- */
// 미들웨어
/* ------------------------------------------------------------------------------- */
app.use((req,res,next)=>{
    console.log('middleware 모든 요청에 실행됩니다.');

    // app.use()를 실행 후 url에 따라 해당하는 코드만 실행한다.
    // 만약 URL이 /a 일 경우 app.get('/a'..) 만 실행하고 
    // app.get('/'...), app.get('/b'..)은 실행 안함
    next();
});

app.get('/', (req, res)=>{
    //console.log('모든 요청에 실행 되어야합니다.')
    res.send('/');
});

app.get('/a', (req, res)=>{
    //console.log('모든 요청에 실행 되어야합니다.')
    res.send('/a');
});

app.get('/b', (req, res)=>{
    //console.log('모든 요청에 실행 되어야합니다.')
    res.send('/b');
});

app.listen(app.get('port'),()=>{
    console.log('3000 익스프레스 서버 실행');
});
