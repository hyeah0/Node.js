## - Sequelize 사용하기

1. 패키지 설치 및 MySQl연결(1~6)
2. 모델 정의(7~8)
3. [CRUD](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/02_Sequelize_2_CRUD.md)

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

<hr>

### 7. 모델 정의

- 시퀄라이즈 모델과 MySQl의 테이블을 연결해주는 역할

- ERD

  <img src="https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mysql/image/terminal/foreignKey.png" width="100%">

  - [models]폴더에 모델을 만들어 테이블과 연결

    - 모델의 이름은 단수형(모델 폴더에 들어가있는 파일)
    - 테이블의 이름은 복수형으로 사용한다.

    - user 모델

      ```
      const Sequelize = require('sequelize');

      /* --------------------------------------------------------------------- */
          User 모델 생성
          Sequelize.Model을 확장한 클래스이다.
      /* --------------------------------------------------------------------- */
      class User extends Sequelize.Model{

          /* --------------------------------------------------------------------- */
              모델은 크게
              - static initate 메서드 : 테이블에 대한 설정
              - static associate 메서드 : 다른 모델과의 관계 작성(기본키 외래키설정)
          /* --------------------------------------------------------------------- */

          /* -- static initate 메서드---------------------------------------------------------------- */
          static initiate(sequelize){

              /* ----------------------------------------------------------------- */
                  모델명.init({테이블 컬럼 설정}, {테이블 자체 설정})
                  시퀄라이즈는 id를 기본키로 연결하여 따로 id 컬럼을 적어줄 필요가 없다.
              /* ----------------------------------------------------------------- */
              User.init(
                  { // 컬럼 설정
                      name:{
                          type: Sequelize.STRING(20),
                          allowNull: false,
                          unique: true,
                      },

                      age:{
                          type: Sequelize.INTEGER.UNSIGNED,
                          allowNull: false,
                      },

                      married:{
                          type: Sequelize.BOOLEAN,
                          allowNull: false,
                      },

                      comment:{
                          type: Sequelize.TEXT,
                          allowNull: true,
                      },

                      created_at:{
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                      },
                  },
                  {   // 테이블 자체 설정
                      sequelize,
                          timestamps: false,
                          underscored: false,
                          modelName: 'User',
                          tableName: 'users',
                          paranoid: false,
                          charset: 'utf8',
                          collate: 'utf8_general_ci',
                  }
              );
          }


        /* -- static associate 메서드 --------------------------------------------------------------------- */
        // 다른 모델과의 관계
        static associate(db){
            db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
        }

      };

      module.exports = User;
      ```

      - ㄴ [user 모델 코드](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/model/user.js)

    <br>

    - comment 모델 일부

      - 외래키 설정시

        <pre>
        1             :             N
                    hasMany    ⎯>
        User  <⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯> Comment
            <⎯    belongsTo
        </pre>

        - User associate 코드

        ```
        static associate(db){
            db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
        }
        ```

        - Comment associate 코드

        ```
        static associate(db){
            db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
        }
        ```

        <hr>

        <pre>
            1             :             1
                        hasOne     ⎯>
        User  <⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯> Comment
                <⎯  belongsTo
        </pre>

        - User associate 코드

        ```
        static associate(db){
            db.User.hasOne(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
        }
        ```

        - Comment associate 코드

        ```
        static associate(db){
            db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
        }
        ```

        <hr>

        <pre>
        - 두개의 테이블(A,B), 두개의 테이블을 합친 테이블(C)
            N             :              M
                    belongsToMany   ⎯>
            A  <⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯>  B
                <⎯  belongsToMany
        </pre>

        - A associate 코드

        ```
        static associate(db){
            db.A.belongsToMany(db.B, {through: 'C'});
        }
        ```

        - B associate 코드

        ```
        static associate(db){
            db.B.belongsToMany(db.A, {through: 'C'});
        }
        ```

        ```
        A 테이블               C 테이블             B 테이블
        id content         A_ID   B_ID          id   title
        1  #오렌지 #사과       1      1             1   오렌지
        2  #오렌지 #포도       1      2             2   사과
        3  #귤               2      1             3   포도
                            2      3             4   귤
                            3      4
        ```

      - ㄴ[comment 모델 코드](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code/model/comment.js)

<br>

- <b> ⭐️ 시퀄라이즈 자료형 ⭐️</b>

  <table>
      <tr><th>MySQL</th><th>시퀄라이즈</th></tr>
      <tr><td>VARCHAR(100)</td><td>STRING(100)</td></tr>
      <tr><td>INT</td><td>INTEGER</td></tr>
      <tr><td>TINYINT</td><td>BOOLEAN</td></tr>
      <tr><td>DATETIME</td><td>DATE</td></tr>
      <tr><th colspan="2">⎯⎯⎯⎯⎯⎯⎯ 제약조건 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</th></tr>
      <tr><td>INT UNSIGNED</td><td>INTEGER>UNSIGNED</td></tr>
      <tr><td>NOT NULL</td><td>allowNull: false == not null</td></tr>
      <tr><td>UNIQUE</td><td>unique: true</td></tr>
      <tr><td>DEFAULT now()</td><td>defaultValue: Sequelize.NOW</td></tr>
  </table>

<br>

- <b> ⭐️ 두번째 인수 : 테이블 자체 설정(옵션) ⭐️</b>
  <table>
      <tr><th>옵션명</th><th>설명</th></tr>
      <tr>
          <td>sequelize</td>
          <td>• static initiate 메서드의 매개변수와 연결되는 옵션
          <br>• 나중에 model/index.js에서 연결한다.
          <br>• db.sequelize 객체를 넣어야한다.
          </td>
      </tr>
      <tr>
          <td>timestamps</td>
          <td>• default값 false
          <br>• true일경우 createdAt 컬럼과 updatedAt 컬럼이 추가된다.
          <br>• 행이 생성될때 수정될때 자동 입력된다.
          </td>
      </tr>
      <tr>
          <td>underscored</td>
          <td>• 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 <b>캐멀케이스</b>이다.
          <br>이를 <b>스테이크 케이스</b>로 바꾸는 옵션이다.
          <br>• createdAT >>> created_at
          </td>
      </tr>
      <tr>
          <td>modelName</td>
          <td>• 모델 이름 설정</td>
      </tr>
      <tr>
          <td>tableName</td>
          <td>• 테이블 이름 설정</td>
      </tr>
      <tr>
          <td>paranoid</td>
          <td>• ture 설정시 <b>deletedAt</b>칼럼이 생긴다.
          <br>• 행 삭제시 완전이 삭제되지 않고 삭제된 시간이 deletedAt 컬럼 행에 기록된다.
          <br>• 추후 행 복원시 사용되며,
          <br>삭제되지 않은 행 검색시 null 값을 추출 하면 된다.
          </td>
      </tr>
      <tr>
          <td>charset, collate</td>
          <td>• 인코딩 
          <br>utf8, utf8_general_ci : 한글
          <br>utf8mb4, utf8mb4_general_ci : 한글+이모티콘
          </td>
      </tr>
  </table>

### 8. [model]폴더 [index.js]파일에 연결

```
const Sequelize = require('sequelize');

/* -- 추가 ----------------------------------------------------------- */
const User = require('./user');
const Comment = require('./comment');
/* ------------------------------------------------------------------ */

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // config.json파일의 development
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

/* -- 추가 ----------------------------------------------------------- */
db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);
/* ------------------------------------------------------------------ */

module.exports = db;
```
