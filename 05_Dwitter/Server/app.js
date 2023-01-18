import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

/* --------------------------------------------------------------------------------------- */
/*      도메인 등록(라우트)                                                                    */
/* --------------------------------------------------------------------------------------- */
app.use('/tweets',tweetsRouter);

/* --------------------------------------------------------------------------------------- */
/*      처리할 수 없는 url 일 경우                                                              */
/* --------------------------------------------------------------------------------------- */
app.use((req, res, next) => {
    res.sendStatus(404)
})

/* --------------------------------------------------------------------------------------- */
/*      에러 처리                                                                            */
/* --------------------------------------------------------------------------------------- */
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(8080);