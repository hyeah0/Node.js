const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser =  require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const dotenv = require('dotenv');       // .env 파일 읽기위해
const passport = require('passport');   // 로그인
dotenv.config();

// 라우터
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const { sequelize } = require('./models');
const passportConfig = require('./passport');   // == ./passport/index.js

const app = express();
passportConfig();   // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

nunjucks.configure('views',{
    express:app,
    watch: true,
});

// DB연결
sequelize.sync({force:false})
         .then(()=>{
            console.log('데이터베이스 연결 성공!');
         })
         .catch((err)=>{
            console.error(err);
         })

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,              // ture : 세션을 언제나 저장(수정사항 없어도 새로 저장)
    saveUninitialized: false,   // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,  // 암호화하는 데 쓰일 키
    cookie: {
        httpOnly: true,         // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        secure: false,          // https 환경에서만 session 정보를 주고받도록처리
    }
}));


app.use(passport.initialize()); // req 객체에 passport 설정
app.use(passport.session());    // req.session 객체에 passport 정보 저장

// 라우터 
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// 404 응답 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 오류 응답 미들웨어
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status || 500);
    res.render('error');
});

// 앱 포트에 연결
app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중.. app.js');
});

