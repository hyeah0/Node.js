# 목차

- [몽고디비](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/tree/main/0_MacSet/mongoDB)
- [몽구스란](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mongoDB/03_mongoose.md)
- 몽구스 연결하기

## 몽구스 연결하기

### 1. 모듈 설치

```
npm init --yes
npm i express morgan nunjucks mongoose
npm i -d nodemon
```

### 2. 몽고디비 연결하기

- 몽고디비는 주소를 사용해서 연결한다

  - 주소형식

    ```
    mongodb://username:password@host:port/database?options

    >> 예시
    mongodb://name:password@localhost:27017/admin
    ```

- 연결 코드

  - ⬇️ schemas/index.js

    ```
    const mongoose = require('mongoose');

    const connect = () =>{

        // 개발 환경일때만 콘솔을 통해 몽구스가 생성하는 쿼리내용을 확인하는 코드
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }

        // 몽구스와 몽고디비를 연결
        // 접속을 시도하는 주소의 데이터베이스 : admin
        // 실제로 사용할 데이터 베이스 : nodejs
        mongoose.connect('mongodb://name:password@localhost:27017/admin', {
            dbName: 'nodejs',
            useNewUrlParser: true,
        }).then(() => {
            console.log("몽고디비 연결 성공");
        }).catch((err) => {
            console.error("몽고디비 연결 에러", err);
        });
    };

    // 몽구스 커넥션 이벤트 리스너
    // 에러 발생시 에러내용 기록
    mongoose.connection.on('error', (error)=>{
        console.error('몽고디비 연결 에러', error);
    });

    // 연결 종료 될 경우 재 연결 시도
    mongoose.connection.on('disconnected', ()=>{
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
        connect();
    });

    module.exports = connect;
    ```

  - ⬇️ app.js

        const express = require('express');
        const path = require('path');
        const morgan = require('morgan');
        const nunjucks = require('nunjucks');

        const connect = require('/schemas');

        const app = express();
        app.set('port', process.env.PORT || 3002);
        app.set('view engine', 'html');
        nunjucks.configure('views', {
            express: app,
            watch: true,
        });

        connect();

        app.use(morgan('dev'));
        app.use(express.static(path.join(__dirname,'public')));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

        app.use((req, res, next)=>{
            const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
            error.status = 404;
            next(error);
        });

        app.use((err, req, res, next)=>{
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        });

        app.listen(app.get('port'), ()=>{
            console.log(app.get('port'), '번 포트에서 대기중');
        });

### 3. 몽고디비 서버실행

- 터미널

  ```
  brew services start mongodb-community
  mongosh admin -u name -p password
  ```

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Mongoose/a_md_img/connect.png" width="100%">

###

###

###

###

###

###
