console.log('c_postTest....');

import express from 'express';
const app = express();

// 모든 요청 json 형태로 가져오기
app.use(express.json());

app.post('/',(req, res, next)=>{
    
    // 요청에서 body 읽어오기
    console.log(req.body);

})

app.listen(8080);