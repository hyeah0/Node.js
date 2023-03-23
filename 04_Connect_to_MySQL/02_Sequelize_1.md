## - Sequelize 사용하기

1. 패키지 설치 및 MySQl연결(1~6)
2. [모델 정의(7~8)](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/02_Sequelize_2_model.md)
3. [CRUD](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/02_Sequelize_3_CRUD.md)

### 1. `sequelize`, `sequelize-cli`, `mysql2` 패키지 설치

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/01_npm_download.png" width="100%">

```
npm i sequelize sequelize-cli mysql2
```

- `sequelize-cli` : 시퀄라이즈 명령어를 실행하기 위한 패키지
- `mysql2` : MySQL과 시퀄라이즈를 이어주는 드라이버

### 2. `npx sequelize init` 명령어 호출

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/02_start_sequelize.png" width="100%">

```
npx sequelize init
```

- 전역 설치 없이 명령어로 사용시 앞에 npx 사용(npx 생략 가능)

- <b>config, models, migrations, seeders</b> 폴더 생성된다.

### 3. <b>[models]</b> 폴더 <b>[index.js]</b> 파일 코드 수정

- <b>index.js</b>

  ```
    const Sequelize = require('sequelize');

    /* --------------------------------------------------------------------- */
        process.env.NODE_ENV 가 없으면 'development'
        배포시에서는 process.env.NODE_ENV를 production 으로 설정한다.

        MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.
            ㄴ [config.json] 파일에 operatorAlias 속성이 있다면 삭제한다.
            ㄴ password 와 데이터베이스 이름을 수정한다.
                ㄴ process.env.NODE_ENV 가 development이면 development 부분 수정
                ㄴ process.env.NODE_ENV 가 test이면 test 부분 수정
                ㄴ process.env.NODE_ENV 가 production이면 production 부분 수정
    /* ---------------------------------------------------------------------- */
    ⭐️ const env = process.env.NODE_ENV || 'development';

    const config = require('../config/config')[env];  // config.json파일의 development
    const db = {};

    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    db.sequelize = sequelize;
    module.exports = db;

    /* 자동생성 코드 ⬇️ : 사용안함 ----------------------------------------------- */
    'use strict';

    const fs = require('fs');
    const path = require('path');
    const Sequelize = require('sequelize');
    const process = require('process');
    const basename = path.basename(__filename);
    const env = process.env.NODE_ENV || 'development';
    const config = require(__dirname + '/../config/config.json')[env];
    const db = {};

    let sequelize;
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
        );
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;

  ```

- [코드 링크](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/models/index.js)
- Sequelize : 시퀄라이즈 패키지이자 생성자
- config/config.json 에서 [env] 데이터 베이스 설정을 불러온 후
  <br> new Sequelize을 통해 MySQL 연결 객체를 생성
- 추후 연결 객체 재사용을 위해 db 객체에 db.seqelize를 넣음

### 4. <b>[config]</b> 폴더 <b>[config.json]</b> password, database 수정

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/03_index.png" width="100%">

- [코드 링크](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/config/config.json)

### 5. <b>seqelize</b>를 통해 <b>MySQL과 Express 연결</b>

1.  app.js 를 생성
2.  익스프레스와 시퀄라이즈 연결 코드 작성

    - <b>app.js</b>

      ```
        const express = require('express');
        const path = require('path');
        const morgan = require('morgan');
        const nunjucks = require('nunjucks');

        /* --------------------------------------------------------------------- */
            require('./models/index.js')와 같다.
            폴더 내 index.js 파일은 require 시 이름을 생략할 수 있다.
        /* --------------------------------------------------------------------- */
        ⭐️ const {sequelize} = require('./models');

        const app = express();
        app.set('port', process.env.PORT||3001);
        app.set('view engin', 'html');

        nunjucks.configure('view',{
            express:app,
            watch: true,
        });

        /* --------------------------------------------------------------------- */
            [models] 폴더 안 [index.js] 파일에서 생성 했던 db.seqelize 을 불러와
            sync 메서드를 사용해 서버 실행시 MySQL과 연동된다.
             ㄴ sequelize는 [models] 폴더 안 [index.js] 파일에서 정의한 db객체이다.
             ㄴ ⭐️내부 force 옵션은 true로 할경우 서버실행시마다 테이블을 재 생성한다.
                ㄴ 테이블을 잘 못 만든 경우에 true로 설정하면 된다.
            MySQl 연동시 [config] 폴더 안 [config.json] 파일 정보가 사용된다.
        /* --------------------------------------------------------------------- */
        sequelize.sync({⭐️force: false})
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

      ```

    - [코드 링크](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/app.js)

### 6. 연결 완료!

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/04_connect.png" width="100%">
