# 목차

- [몽고디비](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/tree/main/0_MacSet/mongoDB)
- [몽구스란](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mongoDB/03_mongoose.md)
- 몽구스 연결하기
- 스키마 정의하기
- 쿼리 실행하기

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

## 스키마 정의하기

- user.js, comments.js 스키마 만들기
- 몽구스는 <b>알아서 \_id를 기본키로 생성</b>하여 따로 \_id 필드를 적을 필요가 없다.

- ```
    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const [테이블이름]Schema = new Schema({
        컬럼명: {
            type: String, Number, Boolean ...
            required : true // true: 필수입력
            unique: true    // true: 고유값
        }
        컬럼명: String, Number, Boolean ... // 특정 옵션이 없을경우 자료형만 입력한다.
    });

    module.exports = mongoose.model('[테이블이름]', [테이블이름]Schema);
  ```

  - [ ] 기호 안에 상황에 맞는 이름을 넣어주면 된다.
  - 몽구스는 몽고디비의 자료형과 조금 다르다.
    - ```
      String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array
      ```

- <details>
    <summary>⬇️ schemas/user.js</summary>

  ```
  const mongoose = require('mongoose');

  const { Schema } = mongoose;
  const userSchema = new Schema({
      name: {
          type: String,
          require: true,
          unique: true,
      },
      age: {
          type: Number,
          required: true,
      },
      married: {
          type: Boolean,
          required: true,
      },
      comment: String,
      createdAt: {
          type: Date,
          default: Date.now,
      },
  });

  module.exports = mongoose.model('User', userSchema);
  ```

</details>

- <details>
    <summary>⬇️ schemas/comments.js</summary>

  ```
  const mongoose = require('mongoose');

  const { Schema } = mongoose;
  const{ Types: { ObjectId }} = Schema;
  const commentSchema = new Schema({
      commenter: {
          type: ObjectId,
          require: true,
          ref: 'User',     // User 컬렉션 조인 User._id
      },
      comment: {
          type: String,
          required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
  });

  module.exports = mongoose.model('Comment', commentSchema);
  ```

</details>

## 쿼리 실행하기

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Mongoose/a_md_img/mongoose.png" width="100%">

1. 화면생성 (views/mongoose.html)
2. view 연결(routes/index.js, app.js)
3. 화면 동적 실행 자바스크립트 코드 작성(public/mongoose.js)
4. 클라이언트 요청에 응답 코드 생성(routes/users.js, app.js)

### 1. 화면생성 (views/mongoose.html, views/error.html)

- [views/mongoose.html](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/views/mongoose.html)
- [views/error.html](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/views/error.html)

### 2. view 연결(routes/index.js, app.js)

- ⬇️ [routes/index.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/routes/index.js)

  ```
  const express = require('express');
  const User = require('../schemas/user');

  const router = express.Router();

  router.get('/', async (req, res, next)=>{
      try{
          const users = await User.fing({});
          res.render('mongoose', {users});
      }catch(err){
          console.error(err);
          next(err);
      }
  });

  module.exports = router;
  ```

- ⬇️ [app.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/app.js)

  <pre>
  ...
  const connect = require('./schemas');<b>const indexRouter = require('./routes/index');</b>
  
  ...
  
  app.use(express.urlencoded({extended: false}));
  <b>app.use('/',indexRouter);</b>
  ...
  </pre>

### 3. 화면 동적 실행 자바스크립트 코드 작성(public/mongoose.js)

- [public/mongoose.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/public/mongoose.js)
<table>
    <tr>
        <th>Function</th>
        <th>Method</th>
        <th>URL</th>
        <th>보내는값</th>
    </tr>
    <tr><td>getUser()</td> <td>Get </td> <td>/users </td><td></td></tr>
    <tr><td>getComment(id)</td> <td>Get </td> <td>/users/id/comments</td><td></td></tr>
    <tr><td>ㄴ 댓글 수정</td> <td>Patch </td> <td>/comments/id</td> <td>comment: newComment</td></tr>
    <tr><td>ㄴ 댓글 삭제</td> <td>Delete </td> <td>/comments/id</td> <td></td></tr>
    <tr><td></td> <td>Post</td> <td>/users</td> <td>name, age, married</td></tr>
    <tr><td></td> <td>Post</td> <td>/comments </td><td>id,comment</td></tr> 
</table>

### 4. 클라이언트 요청에 응답 코드 생성(routes/users.js, routes/comments.js, app.js)

- ➡️ [routes/users.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/routes/users.js)

- ➡️ [routes/comments.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/routes/comments.js)

- ⬇️ [app.js](https://github.com/hyeah0/Node.js/tree/main/04_Mongoose/app.js)

  <pre>
  ...
  const connect = require('./schemas');
  const indexRouter = require('./routes/index');
  <b>const usersRouter = require('./routes/users');</b>
  <b>const commentsRouter = require('./routes/comments');</b>
  
  ...
  
  app.use(express.urlencoded({extended: false}));
  app.use('/', indexRouter);
  <b>app.use('/users', usersRouter);</b>
  <b>app.use('/comments', commentsRouter);</b>
  ...
  </pre>
