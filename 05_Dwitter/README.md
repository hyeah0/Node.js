# Tweets API 설계

## API 설계

### - Tweets

<details>
    <summary><b>Tweets Schema</b></summary>

```
{
  id: string,               // 사용자 고유번호
  text: string,             // 글
  createdAt: Date,          // 글 생성 날짜
  username: string,         // 사용자 이름
  name: string              // 사용자 닉네임
  url: string (optional)    // 사용자 프로파일 사진 URL
}
```

</details>

<table>
    <tr>
        <th>CRUD</th>
        <th>METHOD</th>
        <th>URL</th>
        <th>DESCRIPTION</th>
    </tr>
    <tr>
        <td>Read</td>
        <td>Get</td>
        <td>/tweets
        <td>전체 글 목록 보기</td>
    </tr>
    <tr>
        <td>Read</td>
        <td>Get</td>
        <td>/tweets/?usernick=:usernick
        <td>특정 사용자 글 목록 보기</td>
    </tr>
    <tr>
        <td>Read</td>
        <td>Get</td>
        <td>/tweets/:id
        <td>나의 글 목록 보기</td>
    </tr>
    <tr>
        <td>Create</td>
        <td>Post</td>
        <td>/tweets
        <td>글 작성</td>
    </tr>
    <tr>
        <td>Update</td>
        <td>Put</td>
        <td>/tweets/:id
        <td>글 수정</td>
    </tr>
    <tr>
        <td>Delete</td>
        <td>Delete</td>
        <td>/tweets/:id
        <td>글 삭제</td>
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
        <td></td>
        <td>Post</td>
        <td>/user/login</td>
        <td>로그인</td>
    </tr>
    <tr>
        <td></td>
        <td>Post</td>
        <td>/user/logout</td>
        <td>로그아웃</td>
    </tr>
    <tr>
        <td>Create</td>
        <td>Post</td>
        <td>/user/signup</td>
        <td>회원가입</td>
    </tr>
</table>

- 참고
  - Create : post
  - Read : get
  - Update : put
  - Delete : delete

<hr>

### - Tweets

#### - 전체 글 목록 보기 (Get Tweets)

<dl>
    <dd>
        <details>
            <summary>response : 200</summary>
<pre>
<code>
{
    tweet
}
</code>
</pre>
        </details>
    </dd>
</dl>

#### - 특정 사용자 글 목록 보기 (Get Tweets By username)

<dl>
    <dd>
        <details>
            <summary>response : 200</summary>
<pre>
<code>
 {
     tweet
 }
</code>
</pre>
        </details>
    </dd>
</dl>

#### - 나의 글 목록 보기 (Get Tweets By id)

<dl>
    <dd>
        <details>
            <summary>response : 200</summary>
<pre>
<code>
 {
     tweet
 }
</code>
</pre>
        </details>
    </dd>
</dl>

#### - 글 작성 (Create Tweet)

<dl>
    <dd>
        <details>
            <summary>request</summary>
<pre>
<code>
{
    "text" : "New Message",
    "username" : "bob",
    "name": "Bob"
    "url" : "https://cdn.pixabay.com/photo/2023/01/10/00/30/swan-7708580_960_720.jpg"
}
</code>
</pre>
        </details>
    </dd>
    <dd>
        <details>
            <summary>response : 201</summary>
<pre>
<code>
    {
        tweet
    }
</code>
</pre>
        </details>
    </dd>
</dl>

#### - 글 수정 (Update Tweet)

<dl>
    <dd>
        <details>
            <summary>request</summary>
<pre>
<code>
{
    "text" : "Updated Messaged"
}
</code>
</pre>
        </details>
    </dd>
    <dd>
        <details>
            <summary>response : 200</summary>
<pre>
<code>
 {
     tweet
 }
</code>
</pre>
        </details>
    </dd>
</dl>

#### - 글 삭제 (Delete Tweet)

<dl>
    <dd>
    <details>
        <summary>response : 204</summary>
    </details>
    </dd>
</dl>

### - 사용 npm

| npm                 | 설명                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| express             | 웹 및 모바일 애플리케이션을 위한 기능을 제공하는 라이브러리                                                                    |
| cors                | 헤더에 Access-Control-Allow-Orgin 을 추가 해주는 라이브러리                                                                    |
| helmet              | 보안에 필요한 header를 추가해주는 라이브러리                                                                                   |
| morgan              | 사용자에게 요청을 받을 때마다 log 남기는 라이브러리                                                                            |
| express-async-error | 비동기적 코드 실행시 발생하는 에러 처리시 <br>.catch()로 사용해야하는 부분을 외부에서 에러 처리를 할 수 있도록 하는 라이브러리 |
| nodemon             | 코드 변경시 자동 재시작 라이브러리                                                                                                        |
        

- 2015년 이후 버전 import : "type":"module"
- 자주 사용 하는 코드는 단축키로 저장
  - Configure User Snippets
  - Commend Palette > Configure User Snippets 작성 > javascript.json 클릭
    ```
    rr 작성후 tap 누를 경우 설정한 body가 출력된다.
    "Express Callback":{
    	"prefix" : "rr",
    	"body":[
    		"(req, res, next) => {$1}"
    	],
    	"description": "Express Callback"
    }
    ```
