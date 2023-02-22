# node.js MySQL연결하기

1. sql언어 직접사용
2. Sequelize 사용

## 1. sql언어 직접사용

## 2. Sequelize 사용

### - Sequelize 란?

- MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
- [ORM(Object-Relational Mapping)](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/ORM_Object-Relational-Mapping.md)으로 분류된다.
- MariaD , PostgreSQL, SQLite, MSQL 등 다른 데이터 베이스와 같이 쓸 수 있다.
  - 다른 SQL 데이터베이스로 전환시에 편리

### - Sequelize 사용하기

#### 1. `sequelize`, `sequelize-cli`, `mysql2` 패키지 설치

<img src="https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/img/01_npm_download.png" width="100%">

<details>
    <summary><b>패키지 설치</b></summary>

    npm i sequelize sequelize-cli mysql2

</details>

- `sequelize-cli` : 시퀄라이즈 명령어를 실행하기 위한 패키지
- `mysql2` : MySQL과 시퀄라이즈를 이어주는 드라이버

#### 2. `npx sequelize init` 명령어 호출

<img src="https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/img/02_start_sequelize.png" width="100%">

<details>
    <summary><b>명령어 호출</b></summary>

    npx sequelize init

</details>

- 전역 설치 없이 명령어로 사용시 앞에 npx 사용(npx 생략 가능)

- <b>config, models, migrations, seeders</b> 폴더 생성된다.

#### 3. <b>[models]</b> 폴더 <b>[index.js]</b> 파일 코드 수정

<details>
    <summary><b>index.js</b></summary>

    const Sequelize = require('sequelize');
    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};

    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    db.seqelize = sequelize;
    module.exports = db;

</details>

- [상세 코드 링크](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/models/index.js)
- Sequelize : 시퀄라이즈 패키지이자 생성자
- config/config.json 에서 [env] 데이터 베이스 설정을 불러온 후
  <br> new Sequelize을 통해 MySQL 연결 객체를 생성
- 추후 연결 객체 재사용을 위해 db 객체에 db.seqelize를 넣음

#### 4. <b>[config]</b> 폴더 <b>[config.json]</b> password, database 수정

<img src="https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/img/03_index.png" width="100%">

- [상세 코드 링크](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/config/config.json)

#### 5. <b>seqelize</b>를 통해 <b>MySQL과 Express 연결</b>

1.  app.js 를 생성
2.  익스프레스와 시퀄라이즈 연결 코드 작성

    <details>
        <summary><b>app.js</b></summary>

        const express = require('express');
        const path = require('path');
        const morgan = require('morgan');
        const nunjucks = require('nunjucks');
        const {sequelize} = require('./models');

        const app = express();
        app.set('port', process.env.PORT||3001);
        app.set('view engin', 'html');

        nunjucks.configure('view',{
            express:app,
            watch: true,
        });

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

            res.locals.error = process.env.NODE_ENV !== 'porduction' ? err: {};
            res.status(err.status||500);
            res.render('error');
        })

        app.listen(app.get('port'),()=>{
            console.log(app.get('port'), '번 포트에서 대기중..');
        });

    </details>

    - [상세 코드 링크](<(https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/app.js)>)

#### 6. 연결 완료!

<img src="https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/img/04_connect.png" width="100%">
