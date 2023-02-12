// 써드파티 미들웨어
// CORS : Cross origin resource sharing

import express from 'express';
import cors from 'cors';

const app = express();

// app.use(cors());
// 옵션 지정 가능 : 배포한 클라이언트에만 보여지도록
app.use(cors({
    origin: ['http//127.0.0.1:5500'],
    optionsSuccessStatus: 200,
    credential: true   // header에 사용정보를 추가 가능
    })
);

app.get('/',(req, res)=>{
    res.send('hi cors');
})

app.listen(8080);