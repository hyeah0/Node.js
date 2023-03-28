const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

/** -- 라우터 -- */
const v1 = require('./routes/v1');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');

/** ------------- */
const { sequelize } = require('./models');
const passportConfig = require('./passport');

/** -- 앱 설정 -- */
const app = express();
passportConfig();
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');

/** ------------- */
nunjucks.configure('views',{
    express: app,
    watch: true,
});
sequelize.sync({force:false})
         .then(()=>console.log('DB연결 성공'))
         .catch((err)=>console.log(err));

/** ------------- */
app.use(morgan('dev'));

/** ------------- */
app.use(express.static(path.join(__dirname,'public')));     // 정적 파일 위치(css, js)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** ------------- */
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

/** -- passport -- */
app.use(passport.initialize());
app.use(passport.session());

/** -- 라우터 -- */
app.use('/v1', v1);             // /v1/*   v1 가 들어간 주소는 v1 실행
app.use('/auth', authRouter);   // /auth/* auth 가 들어간 주소는 authRouter 실행
app.use('/', indexRouter);

/** ------------- */
// 404 응답 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 오류 응답 미들웨어
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV != 'production' ? err: {};
    res.status(err.status || 500);
    res.render('error');
});

/** ------------- */
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});