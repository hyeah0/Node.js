### ⭐️ Step By Step

- 메인

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/r01_main.png" width="100%">

- 회원가입 화면

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/r01_join.png" width="100%">

1. package.json 생성

<br>

2. 라이브러리 설치

   - sequelize sequelize-cli mysql2
   - express cookie-parser express-session
   - morgan multer dotenv
   - nunjucks
   - nodemon

<br>

3. 폴더생성

   - [views]
   - [routes]
   - [public]
   - [passport]

<br>

4. 파일생성

   - [app.js]
   - [.env] : 쿠키 비밀번호 입력

<br>

5. [routes]폴더에 [page.js]파일 생성 (router 작성)
   <br>[controllers]폴더에 [page.js]파일 생성

   - [app.js] >>> [routes/page.js] : page rounter
   - [routes/page.js] >>> [controllers/page.js]

<br>

6. [view]폴더 안 파일 작성

   - [views]
     - [layout.html]
     - [main.html]
     - [profile.html]
     - [join.html]
     - [error.html]

 <br>

7. [models]폴더 안 파일작성
   - [models]
     - [User.js]
     - [Post.js]
     - [Hashtag.js]

<br>

8. [config]폴더 [config.json]파일 비밀번호 작성

<br>

9. 데이터베이스와 모델을 연결 ([app.js])

<br>
