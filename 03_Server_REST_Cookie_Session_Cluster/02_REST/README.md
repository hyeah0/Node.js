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

### RESTful system 6가지 가이드

1. Client-server architecture
2. StateLessness : HTTP에서 자동으로 생성
3. Cacheability : HTTP 에서 자동으로 생성
4. Layered System
5. Code on demand
6. Uniform interface
