// middleware 
// 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는 함수들

// CORS : Cross origin resource sharing
// 클라이언트와 서버가 동일한 서버에서 동작하고 있으면 리소스를 제약없이 주고 받을 수 있지만,
// 클라이언트가 서버와 다른 ip에서 있다면 서버에서 클라이언트에게 반응을 보낼때 
// Access-Control-Allow-Orgin을 헤더에 추가해줘야지 리소스를 주고 받을 수 있다.

// 불편한점 [ Access-Control-Allow-Orgin ] 을 스펠링을 정확히 알고 있어야한다. 
// 보완 : cors >>> npm i cors (헤더에  Access-Control-Allow-Orgin 을 추가 해준다.)

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