### Folder

<details>
    <summary>
      <b><a href="">[๐๏ธviews]</a></b>
        <br>views : ๋ฐ์ดํ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์ฌ์ฉ์๋ค์ด ๋ณผ ์ ์๋ ํ๋ฉด
      </br>
    </summary>
    <br>
    <ul>
      <li>
         <a href="">[layout.html]</a>
         : ํ๋ฉด ์ผํธ (๋ก๊ทธ์ธ, ๋ก๊ทธ์์ ์ํ๋ณ ํ๋ฉด)
      </li>
      <li>
         <a href="">[main.html]</a>
         : ํ๋ฉด ์ค๋ฅธํธ (ํธ์ ์์ฑ ๋ฐ ํธ์ํ์ธ)
      </li>
      <li>
         <a href="">[profile.html]</a>
         : ํ๋ก์ ๋ชฉ๋ก, ํ๋ก์ ๋ชฉ๋ก
      </li>
      <li>
         <a href="">[join.html]</a>
         : ํ์๊ฐ์
      </li>
      <li>
         <a href="">[error.html]</a>
         : ์๋ฌ์
      </li>
    </ul>
<br>
</details>
<details>
    <summary>
      <b>
        <a href="">[๐๏ธmodels]</a> 
      </b>
      <br>models : ๋ฐ์ดํ๋ฒ ์ด์ค, ์ฒ์์ ์ ์ํ๋ ์์, ์ด๊ธฐํ๊ฐ, ๋ณ์
    </summary>
    <br>
    <ul>
      <li>
         <a href="">[index.js]</a>
         : user, post, hashtag ๋ชจ๋ธ ์ฐ๊ฒฐ 
      </li>
      <li>
         <a href="">[User.js]</a>
         : user ํ์ด๋ธ
      </li>
      <li>
         <a href="">[Post.js]</a>
         : post ํ์ด๋ธ
      </li>
      <li>
         <a href="">[HashTag.js]</a>
         : hashtag ํ์ด๋ธ
      </li>
      <li>์ํ๋ผ์ด์ฆ ๊ด๊ณํ์ํ(associate) ์์ฑ
        <ul>
          <li>
            <a href="">[Follow]</a>
            : ํ๋ก์ฐํ ์์ด๋์ ํ๋ก์ํ ์์ด๋
          </li>
          <li>
            <a href="">[PostHashtag]</a> 
            <br>๐ ๋ชจ๋ธ์ ๋๊ฐ ์ปฌ๋ผ ์์ฑ 
            <br>โข postId : postํ์ด๋ธ์ id
            <br>โข hashtagId: hashtagํ์ด๋ธ์ id 
          </li>
        </ul>
      </li>
    </ul>

<br>
</details>
<details>
    <summary>
      <b><a href="">[๐๏ธpublic]</a></b>
      : ์ ์  ํ์ผ(ex. cssํ์ผ)
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[main.css]</a>
         : css ํ์ผ
      </li>
    </ul>
<br>
</details>
<details>
    <summary>
      <b><a href="">[๐๏ธroutes / ๐๏ธcontrollers]</a></b>
      <br>routes : ํต์  ๋ฐ์ดํฐ๋ฅผ ๋ณด๋ผ ๋ ์ต์ ์ ๊ฒฝ๋ก๋ฅผ ์ ํ
      <br>controllers : ๋ฐ์ดํฐ์ ์ฌ์ฉ์์ธํฐํ์ด์ค ์์๋ค์ ์๋ ๋ค๋ฆฌ์ญํ 
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[auth.js]</a>
        : ํ์๊ฐ์, ๋ก๊ทธ์ธ, ๋ก๊ทธ์์
        <ul>
          <li>
            <a href="">[controllers/auth.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[page.js]</a>
        : page์ด๋(ํ๋กํ, ํ์๊ฐ์, ๋ฉ์ธ, ๊ฒ์)
        <ul>
          <li>
            <a href="">[controllers/page.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[post.js]</a>
        : ๊ธ ์์ฑ(multer ์ค์ )
        <ul>
          <li>
            <a href="">[controllers/post.js]</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="">[user.js]</a>
        : ํ๋ก์
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
      <b><a href="">[๐๏ธpassport]</b>
    </summary>
    <br>
    <ul>
      <li>
        <a href="">[index.js]</a>
         : ๋ก๊ทธ์ธ์ ์คํ, ์์ฒญ๋ง๋ค ์คํ(serializeUser, deserializeUser)
      </li>
      <li>
        <a href="">[kakaoStrategy.js]</a>
         : css ํ์ผ
      </li>
      <li>
        <a href="">[localStrategy.js]</a>
         : css ํ์ผ
      </li>
    </ul>
<br>
</details>

<details>
    <summary>
      <b><a href="">[uploads]</a></b>
      : ํฌ์คํ์ ์ด๋ฏธ์ง๋ ๊ฐ์ด ์์ฑํ  ๊ฒฝ์ฐ ์ด๋ฏธ์ง ํ์ผ ์ ์ฅ
    </summary>
</details>

<details>
    <summary>
      <b><a href="">app.js</a></b>
      : ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ฐ๊ฒฐ, ํฌํธ์ค์ , ์๋ฌ์ฒ๋ฆฌ, DB์ ๋ชจ๋ธ ์ฐ๊ฒฐ
    </summary>
</details>

<details>
    <summary>
      <b><a href="">.env</a></b>
      : ์ฟ ํค ๋น๋ฐ๋ฒํธ
    </summary>
</details>

<hr>
