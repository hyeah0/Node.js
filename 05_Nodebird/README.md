### Folder

<details>
    <summary>
      <b><a href="">[🗂️views]</a></b>
        <br>views : 데이타를 기반으로 사용자들이 볼 수 있는 화면
      </br>
    </summary>
    <br>
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
<br>
</details>
<details>
    <summary>
      <b>
        <a href="">[🗂️models]</a> 
      </b>
      <br>models : 데이타베이스, 처음의 정의하는 상수, 초기화값, 변수
    </summary>
    <br>
    <ul>
      <li>
         <a href="">[index.js]</a>
         : user, post, hashtag 모델 연결 
      </li>
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

<br>
</details>
<details>
    <summary>
      <b><a href="">[🗂️public]</a></b>
      : 정적 파일(ex. css파일)
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[main.css]</a>
         : css 파일
      </li>
    </ul>
<br>
</details>
<details>
    <summary>
      <b><a href="">[🗂️routes / 🗂️controllers]</a></b>
      <br>routes : 통신 데이터를 보낼 때 최적의 경로를 선택
      <br>controllers : 데이터와 사용자인터페이스 요소들을 잇는 다리역할
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[auth.js]</a>
        : 회원가입, 로그인, 로그아웃
        <ul>
          <li>
            <a href="">[controllers/auth.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[page.js]</a>
        : page이동(프로필, 회원가입, 메인, 검색)
        <ul>
          <li>
            <a href="">[controllers/page.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[post.js]</a>
        : 글 작성(multer 설정)
        <ul>
          <li>
            <a href="">[controllers/post.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[user.js]</a>
        : 팔로잉
        <ul>
          <li>
            <a href="">[controllers/user.js]</a>
          </li>
        </ul>
      </li>
    </ul>
<br>
</details>

<details>
    <summary>
      <b><a href="">[🗂️passport]</b>
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[index.js]</a>
         : 로그인시 실행, 요청마다 실행(serializeUser, deserializeUser)
      </li>
      <li>
        <a href="">[kakaoStrategy.js]</a>
         : 카카오 로그인 전략(방식)
      </li>
      <li>
        <a href="">[localStrategy.js]</a>
         : 로컬 로그인 전략(방식)
      </li>
    </ul>
<br>
</details>

<details>
    <summary>
      <b><a href="">[uploads]</a></b>
      : 포스팅시 이미지도 같이 작성할 경우 이미지 파일 저장
    </summary>
</details>

<details>
    <summary>
      <b><a href="">app.js</a></b>
      : 라이브러리 연결, 포트설정, 에러처리, DB와 모델 연결
    </summary>
</details>

<details>
    <summary>
      <b><a href="">.env</a></b>
      : 쿠키 비밀번호
    </summary>
</details>

<hr>

## Nodebird API 설계

### - Page

  <table>
    <tr>
      <th>CRUD</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>READ</td><td>GET</td><td> /        </td>
      <td>모든 글 보기
      <br>[views/main.html]</td>
    </tr>
    <tr>
      <td>READ</td><td>GET</td><td> /profile </td>
      <td>팔로워, 팔로잉 리스트 보기
      <br>[views/profile.html]</td>
    </tr>
    <tr>
      <td></td><td>GET</td><td> /join    </td>
      <td>회원가입 페이지 이동
      <br>[views/join.html]</td>
    <tr>
      <td>READ</td><td>GET</td><td> /hashtag </td>
      <td>해시태그 검색 결과 보기</td>
    </tr>
    <tr>
      <td>READ</td><td>GET</td><td> /:id/post </td>
      <td>특정 id 글 보기</td>
    </tr>
  </table>

<hr>

### - Auth

  <table>
    <tr>
      <th>CRUD</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>CREATE</td><td>POST</td><td>/auth/join          </td>
      <td>회원가입</td>
    </tr>
    <tr>
      <td></td><td>POST</td><td>/auth/login         </td>
      <td>로컬 로그인</td>
    </tr>
    <tr>
      <td></td><td>GET </td><td>/auth/kakao         </td>
      <td>카카오 로그인(카카오 창 리다이렉트)</td>
    </tr>
    <tr>
      <td></td><td>GET </td><td>/auth/kakao/callback</td>
      <td>카카오 로그인 성공 여부 결과를 받아 수행</td>
    </tr>
    <tr>
      <td>READ</td><td>GET </td><td>/auth/logout        </td>
      <td>로그아웃</td>
    </tr>
  </table>

<hr>

### - Post

  <table>
    <tr>
      <th>CRUD</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>CREATE</td><td>POST   </td><td>/post/img   </td>
      <td>파일 업로드</td>
    </tr>
    <tr>
      <td>CREATE</td><td>POST   </td><td>/post       </td>
      <td>글 작성</td>
    </tr>
    <tr>
      <td>UPDATE</td><td>PUT    </td><td>/post/change</td>
      <td>글 수정</td>
    </tr>
    <tr>
      <td>DELETE</td><td>DELETE </td><td>/post/delete</td>
      <td>글 삭제
    </tr>
  </table>

### - User

  <table>
    <tr>
      <th>CRUD</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
        <td>CREATE</td><td>POST</td><td>/user/:id/follow  </td>
        <td>팔로우 하기</td>
    </tr>
    <tr>
      <td>DELETE</td><td>DELETE</td><td>/user/:id/defollow</td>
      <td>팔로우취소(언팔로우)</td>
    </tr>
  </table>
