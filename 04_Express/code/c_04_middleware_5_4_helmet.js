// middleware 
// 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는 함수들

// npm i cookie-parser : request 안에 있는 cookie의 정보를 보기 위해
// npm i morgan : 사용자에게 요청을 받을 때마다 log 남김
// npm i helmet : 보안에 필요한 header를 추가

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';   

console.log('cookie-parser')
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json()); // body 내용을 보기위해.. req.body
app.use(cookieParser);   // cookie 정보를 보기 위해
app.use(helmet());


app.get('/',(req, res)=>{
    console.log(req.body);
    //console.log(req.cookies);
    res.send('hi cookie-parser morgan helmet');
   
})

app.listen(8585);