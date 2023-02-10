// html 파일 읽어오기

const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT||3000);

/* ------------------------------------------------------------------------------- */
// html 파일 읽어오기
/* ------------------------------------------------------------------------------- */
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'/html/index.html'));
});

app.get('/about', (req, res)=>{
    res.send('/about 일때 실행');
});


app.listen(app.get('port'),()=>{
    console.log('3000 익스프레스 서버 실행');
});