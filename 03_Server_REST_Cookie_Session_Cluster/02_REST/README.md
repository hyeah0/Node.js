## REST

- Represntational State Transfer
- 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법이다.
- 일종의 약속

## RESTful

- REST를 따르는 서버를 RESTful하다라 표현한다.

### - 메서드 종류

| CRUD    | 메서드  | 설명                                  |
| ------- | ------- | ------------------------------------- |
| Create  | POST    | 서버의 자원을 새로 등록시 사용        |
| Read    | GET     | 서버의 자원을 가져올때 사용           |
| Update  | PUT     | 서버의 자원을 변경(수정)시 사용       |
| Update  | Patch   | 서버의 자원 일부만 수정               |
| Delete  | DELETE  | 서버의 자원을 삭제할때 사용           |
| Options | Options | 요청전 통신 옵션을 설명하기 위해 사용 |

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
