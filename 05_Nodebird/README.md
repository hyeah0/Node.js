### Folder

<details>
    <summary><b><a href="">[🗂️views]</a>: 화면(html)</b></summary>
    <ul>
      <li>
         <a href="">[layout.html]</a>
         : 화면 왼편 (로그인, 로그아웃 상태별 화면)
      </li>
      <li>
         <a href="">[main.html]</a>
         : 화면 오른편 (트윗 작성 및 트윗확인)
      </li>
      <li>
         <a href="">[profile.html]</a>
         : 팔로잉 목록, 팔로워 목록
      </li>
      <li>
         <a href="">[join.html]</a>
         : 회원가입
      </li>
      <li>
         <a href="">[error.html]</a>
         : 에러시
      </li>
    </ul>
</details>
<details>
    <summary><b><a href="">[🗂️models]</a>: 모델파일(테이블)</b></summary>
    <ul>
      <li>
         <a href="">[User.js]</a>
         : user 테이블
      </li>
      <li>
         <a href="">[Post.js]</a>
         : post 테이블
      </li>
      <li>
         <a href="">[HashTag.js]</a>
         : hashtag 테이블
      </li>
      <li>시퀄라이즈 관계파악후(associate) 생성
        <ul>
          <li>
            <a href="">[Follow]</a>
            : 팔로우한 아이디와 팔로잉한 아이디
          </li>
          <li>
            <a href="">[PostHashtag]</a> 
            <br>👉 모델에 두개 컬럼 생성 
            <br>• postId : post테이블의 id
            <br>• hashtagId: hashtag테이블의 id 
          </li>
        </ul>
      </li>
    </ul>

</details>
<details>
    <summary><b><a href="">[🗂️public]</a>: 정적 파일(ex. css파일)</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>
<details>
    <summary><b><a href="">[🗂️routes]</a>:</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>
<details>
    <summary><b><a href="">[🗂️controller]</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>
<details>
    <summary><b><a href="">[🗂️passport]</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>
<details>
    <summary><b><a href="">app.js</a>: 라이브러리 연결, 포트설정, 에러처리, DB와 모델 연결</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>
<details>
    <summary><b><a href="">.env</a>: 쿠키 비밀번호</b></summary>
    <ul>
      <li>aa</li>
    </ul>
</details>

<hr>

### ⭐️ Step By Step

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
