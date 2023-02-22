const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

// require('./models/index.js')와 같다.
// 폴더 내 index.js 파일은 require 시 이름을 생략할 수 있다.
const {sequelize} = require('./models');

const app = express();
app.set('port', process.env.PORT||3001);
app.set('view engin', 'html');

nunjucks.configure('view',{
    express:app,
    watch: true,
});

// [models] 폴더 안 [index.js] 파일에서 생성 했던 db.seqelize 을 불러와 
// sync 메서드를 사용해 서버 실행시 MySQL과 연동된다.
//  ㄴ sequelize는 [models] 폴더 안 [index.js] 파일에서 정의한 db객체이다.
//  ㄴ 내부 force 옵션은 true로 할경우 서버실행시마다 테이블을 재 생성한다.
//  ㄴ 테이블을 잘 못 만든 경우에 true로 설정하면 된다.
// MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.
sequelize.sync({force: false})
    .then(()=>{console.log('DB연결 성공');})
    .catch((err)=>{console.err(err);});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json);
app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
    const error = new Error(`${req.method}, ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    
    res.locals.message = err.message;

    // 조건식 ? 조건식이 참일때 값 : 조건식이 거짓일때 값
    res.locals.error = process.env.NODE_ENV !== 'porduction' ? err: {};
    res.status(err.status||500);
    res.render('error');
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중..');
});


