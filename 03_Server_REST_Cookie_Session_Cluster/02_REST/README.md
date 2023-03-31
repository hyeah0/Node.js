## REST

- Represntational State Transfer
- 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법이다.
- 일종의 약속

## REST 구성

- 자원(RESOURCE) - URI
- 행위(Verb) - HTTP METHOD
- 표현(Representations)

## REST 특징

- <h4>Uniform (유니폼 인터페이스)</h4>

  - URI로 지정한 리소스에 대한 <b>조작을 통일되고 한정적인 인터페이스로 수행</b>

- <h4>Stateless(무상태성)</h4>

  - 상태 정보를 따로 저장하고 관리하지 않음(세션, 쿠키정보를 별도 저장)
  - 들어오는 요청만 단순 처리
  - 서비스 자유도 상승, 서버에서 불필요한 정보 관리 하지 않음으로 구현이 단순

- <h4>Cacheable(캐시 가능)</h4>

  - HTTP라는 기존 웹표준을 그대로 사용으로 기존 인프라 그대로 활용 가능(HTTP 캐싱기능 적용가능)
    - HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능

- <h4>Self-descriptiveness (자체 표현 구조)</h4>
   - 메세지만 보고도 이해할 수 있는 자체 표현 구조

- <h4>Client - Server 구조</h4>
   -  API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분
   - 클라이언트와 서버에서 개발해야 할 내용이 명확, 의존성이 줄어든다.

- <h4>계층형 구조</h4>
   - 다중 계층으로 구성될 수 있다.
   - 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있다.
   - PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있게 합니다.

## RESTful

- REST를 따르는 서버를 RESTful하다라 표현한다.

## - 메서드 종류

| CRUD    | 메서드  | 설명                                  |
| ------- | ------- | ------------------------------------- |
| Create  | POST    | 서버의 자원을 새로 등록시 사용        |
| Read    | GET     | 서버의 자원을 가져올때 사용           |
| Update  | PUT     | 서버의 자원을 변경(수정)시 사용       |
| Update  | Patch   | 서버의 자원 일부만 수정               |
| Delete  | DELETE  | 서버의 자원을 삭제할때 사용           |
| Options | Options | 요청전 통신 옵션을 설명하기 위해 사용 |

## REST API 디자인 가이드

1. URI에 정보의 자원을 표현
2. 자원에대한 행위는 HTTP Method로 표현(GET, POST, PUT, DELETE..)

   ### ⭐️ 예시

   - 멤버고유번호 1인 멤버를 삭제하기

     #### 1. URI에 정보의 자원을 표현

     - 리소스명은 동사보다는 명사를 사용

       ```
       GET /명사/1         >>> 제대로 적용
       GET /동사/1         >>> 제대로 적용하지 않은 URI
       GET /delete/1      >>> 제대로 적용하지 않은 URI
       GET /members/1     >>> 제대로 적용
       ```

     #### 2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)로 표현

     ```
     DELETE /members/1    >>> 최종적용
     ```

## URI 설계 시 주의

1. 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용
2. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
   ```
   http://test.com/abc        (o)
   http://test.com/abc/       (x)
   ```
3. 하이픈(-)은 URI 가독성을 높이는데 사용
4. 밑줄(\_)은 URI에 사용하지 않는다.
5. URI 경로에는 소문자가 적합
6. 파일 확장자는 URI에 포함시키지 않는다.
   ```
   http://test.com/abc/apple           (o)
   http://test.com/abc/apple.jpg       (x)
   ```

## 참고 이미지 & 코드

- [restServer 코드](https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/restServer.js)

| 기능   | 메소드 | url            | 설명                                   |
| ------ | ------ | -------------- | -------------------------------------- |
| Read   | GET    | /              | 전체 글 보기(restFront.html 파일 제공) |
| Read   | GET    | /about         | 소개페이지(about.html 파일 제공)       |
| Read   | GET    | /users         | 유저 정보                              |
| Create | POST   | /user          | 유저등록                               |
| Update | PUT    | /user/사용자id | 유저수정                               |
| Delete | DELETE | /user/사용자id | 유저삭제                               |

<h3>** 네트워크 탭</h3>

- <b>Headers</b><br>
  General 공통헤더<br>
  Request Headers 요청헤더<br>
  Response Headers 응답헤더
- <b>Payload</b><br>
  요청 본문
- <b>Preview</b> 또는 <b>Response</b><br>
  응답본문<br>
  res.end로 보낸 문자열을 확인 할 수 있다.

1. GET /users : 화면 실행시

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/01_GET_openServer.png" width="100%">

2. POST /user : 등록시

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/02_POST_01.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/02_POST_02.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/02_POST_03.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/02_POST_04.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/02_POST_05.png" width="100%">

3. PUT /user : 수정시

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/03_PUT_01.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/03_PUT_02.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/03_PUT_03.png" width="100%">

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/03_PUT_04.png" width="100%">

4. DELETE /user : 삭제시

   <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/04_DELETE_01.png" width="100%">

    <img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/02_REST/img/04_DELETE_02.png" width="100%">
