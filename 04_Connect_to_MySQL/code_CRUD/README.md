# 사용자를 등록하고 댓글 남기기

<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/crud1.png" width="100%">
<img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/crud2.png" width="100%">

1. npm 생성, 라이브러리 설치

   - [라이브러리 참고 : package.json](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/package.json)
   - [npm 생성, 라이브러리 다운 방법 참고](https://github.com/hyeah0/Node.js/tree/main/02_NPM)

2. <b>[config]</b> 폴더 [config.json](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code_CRUD/config/config.json) : DB비밀번호, DB명 입력

3. [app.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/app.js) : express, router 설정

4. <b>[models]</b> 폴더 [models 정의](https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/code_CRUD/models) : 모델을 만들어 테이블에 연결

   - user, comment : 테이블 모델
   - index : db객체에 user, comment 모델을 담음
   - [모델 참고 링크 7번부터~](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/02_Sequelize_1.md)

5. <b>[views]</b> 폴더 [sequelize.html](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/views/sequelize.html) : 화면 - 실행 폴더
   <br>&nbsp;&nbsp;&nbsp; 👉 nunjucks
   <br> <b>[views]</b> 폴더 [error.html](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/views/error.html) : 화면 - 에러시 실행 폴더

6. <b>[public]</b> 폴더 [style.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/public/style.css) : css 파일
   <br> <b>[public]</b> 폴더 [sequelize.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/public/sequelize.js) : js 파일, input 텍스트 입력, 버튼 클릭시 실행
   <br> &nbsp;&nbsp;&nbsp; 👉 input 유효성 검사
   <br> &nbsp;&nbsp;&nbsp; 👉 axios.메서드('url',{보낼인자})

7. <b>[routes]</b> 폴더 [index.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/routes/index.js) : 메인화면(화면 켜자마자) 사용 쿼리 (전체 사용자, 전체 댓글 확인 가능)
   <br><b>[routes]</b> 폴더 [users.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/routes/users.js) : 사용자 등록시, 사용자 클릭시 댓글 확인 사용 쿼리
   <br><b>[routes]</b> 폴더 [comments.js](https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/code_CRUD/routes/comments.js) : 댓글 보기, 수정, 삭제
   <br> &nbsp;&nbsp;&nbsp; 👉 시퀄라이즈 쿼리 사용 또는 sql 쿼리 사용

### - 시퀄라이즈 sql 사용

- 시퀄라이즈 쿼리

```
⭐️ const users = await User.findAll();

🐸 const comment = await Comment.create({
              commenter: req.body.id,
              comment: req.body.comment,
            });
```

- 시퀄라이즈 직접 sql 작성

```
⭐️ const sql = `select * from users`;
const users = await sequelize.query(sql, { type: QueryTypes.SELECT });

🐸 const sql = 'insert into comments values (DEFAULT, ?, ?, DEFAULT)';
const inputComment = await sequelize.query(sql, {
    type: QueryTypes.INSERT,
    replacements: [commenter, comment],
})
```

### - MySQL AUTO_INCREMENT 초기화

```
ALTER TABLE db명.테이블명 AUTO_INCREMENT = 초기화할 숫자;

ALTER TABLE nodejs.users AUTO_INCREMENT = 1;
```
