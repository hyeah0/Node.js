const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

nunjucks.configure('views',{
    express: app,
    watch: true,
});

sequelize.sync({force: false})
    .then(()=>{console.log('DB연결 성공');})
    .catch((err)=>{console.error(err);});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));    // 정적파일 연결
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);              // url 주소가 /* 은 indexRouter 실행
app.use('/users', usersRouter);         // url 주소가 /users 은 userRouter 실행
app.use('/comments', commentsRouter);   // url 주소가 /comments/* 은 commentRouter 실행

// url이 [/], [/users], [/comments] 세가지에 해당하지 않을 경우
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중..');
});

