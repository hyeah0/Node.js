- cookie-parser & express-session & dotenv
- routes
- sequelize
- passport
- nunjucks
- morgan
- 정적파일 사용시
- parsing
- error처리 & listen

## 코드 전체

- [코드 원본](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/app.js)

```
const express = require('express');
const morgan = require('morgan');               // 사용자에게 요청을 받을 때마다 log 생성
const path = require('path');

const cookieParser =  require('cookie-parser'); // cookie의 정보를 객체화 {key : value}
const session = require('express-session');

const nunjucks = require('nunjucks');

const dotenv = require('dotenv');               // .env 파일 읽기위해
const passport = require('passport');           // 로그인
dotenv.config();

/** -- 라우터 -- */
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

/** ---------- */
const { sequelize } = require('./models');
const passportConfig = require('./passport');   👉 == ./passport/index.js

/** -- 앱설정 -- */
const app = express();
passportConfig();               👉 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

/** ---------- */
nunjucks.configure('views',{    👉 views폴더가 넌적스파일 위치
    express: app,               👉 express 속성에 app 객체를 연결
    watch: true,                👉 watch : true >>> HTML 파일이 변경될 때에 템플릿 엔진을 reload
});

/** ---------------------------------------------------------
    DB연결
    sequelize는 [models] 폴더 안 [index.js] 파일에서 정의한 db객체이다.
    db.seqelize 을 불러와 sync 메서드를 사용해 서버 실행시 MySQL과 연동된다.
        ㄴ ⭐️내부 force 옵션은 true로 할경우 서버실행시마다 테이블을 재 생성한다.
            ㄴ 테이블을 잘 못 만든 경우에 true로 설정하면 된다.
    MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.
------------------------------------------------------------- */
sequelize.sync({force:false})
         .then(()=>{ console.log('데이터베이스 연결 성공!');})
         .catch((err)=>{ console.error(err); });

/** ---------- */
app.use(morgan('dev'));
👉 인수로 dev, combined, common, short, tiny 가능
    👉 dev : 요청과 응답을 한눈에 볼 수 있어 개발 환경에서 많이 사용
             [HTTP 메서드][url주소][HTTP 상태코드][응답속도]-[응답바이트]를 의미한다.
    👉 combined : 좀 더 상세히(ip, 시간 .. etc) 나와 있어 배포 환경에서 많이 사용 한다.

/** ---------- */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

/** ---------- */
app.use(express.json());
👉 express.json : request.body에 있는 데이터를 json 형식으로 파싱(parsing)
    👉 parsing: 문서나 html 등의 자료에서 원하는 정보만 가공하고 추출해서 불러올 수 있게 하는 것
    👉 parser : 파싱을 수행하는 프로그램

app.use(express.urlencoded({extended: false}));
👉 express.urlencoded : url을 객체화시켜 속성을 보면 query라는 속성 정보가 있고,
                        이 속성에는 클라이언트에서 서버로 들어오는 요청 파라미터의 정보가 담겨져 있다.
    👉 extended : bodyParser 미들웨어의 여러 옵션 중에 하나
                  false : node.js에 기본으로 내장된 queryString 사용
                  true : 따로 설치가 필요한 npm qs 라이브러리를 사용(중첩객체 처리 가능)

/** ---------- */
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,              👉 ture : 세션을 언제나 저장(수정사항 없어도 새로 저장)
    saveUninitialized: false,   👉 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,  👉 암호화하는 데 쓰일 키
    rolling: true,              👉 시간설정1
    cookie: {
        httpOnly: true,         👉 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        secure: false,          👉 https 환경에서만 session 정보를 주고받도록처리
        maxAge: 1*60*60*1000,   👉 하루 시간설정2
    }
}));
👉 로그인시 Server >> Client에게 쿠키로 sessionId 발급
   Server 접속시 발급받은 SessionId 값을 이용해 어떤 Client인지 식별 후 사용자 정보 제공
👉 이를 쉽게 사용 할 수 있는 모듈 : express-session
   secret키를 sessionID 생성에 참고해 sessionID를 역으로 해석해서 원래 정보를 알아내기 힘들도록 한다.

/** -- passport -- */
app.use(passport.initialize()); 👉 req 객체에 passport 설정
app.use(passport.session());    👉 req.session 객체에 passport 정보 저장

/** -- 라우터 -- */
app.use('/', pageRouter);       👉 주소가 /*      pageRouter 실행
app.use('/auth', authRouter);   👉 주소가 /auth/* authRouter 실행
app.use('/post', postRouter);   👉 주소가 /post/* postRouter 실행
app.use('/user', userRouter);   👉 주소가 /user/* userRouter 실행

/** -- 오류 미들웨어 -- */
👉 404 응답 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

👉 오류 응답 미들웨어
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status || 500);
    res.render('error');
});

/** -- 앱 포트에 연결 -- */
app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중.. app.js');
});
```

## - cookie-parser & express-session & dotenv

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app01_dotenv.png" widht="100%">
<br>

## - routes

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app02_routes.png" widht="100%">
<br>

## - sequelize

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app03_sequelize.png" widht="100%">
<br>

## - passport

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app04_passport.png" widht="100%">
<br>

## - nunjucks

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app05_nunjucks.png" widht="100%">
<br>

## - morgan

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app06_morgan.png" widht="100%">
<br>

## - 정적파일 사용시

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app07_static.png" widht="100%">
<br>

## - parsing

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app08_parsing.png" widht="100%">
<br>

## - error처리 & listen

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Express/img/express_app/app09_error.png" widht="100%">
<br>
