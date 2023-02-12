const express = require('express');
const app = express();

app.use(express.json);  // 사용자에서 json 데이터를 보냈을때 req.body에서 해석가능
app.use(express.urlencoded({extended : true})); // form submit시 폼 파싱 
// ㄴ extended : true 일때는 qs 모듈 사용
// ㄴ extended : false 일때는 querystring 모듈 사용

app.get('/',(req, res)=>{
    //req.body.사용자폼에서보낸이름
    res.send('aaa')
})

