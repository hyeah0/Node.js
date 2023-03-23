<h1>uuid(<b>U</b>niversally <b>U</b>nique <b>ID</b>entifier)</h1>

- 범용 고유 식별자
- 고유하다, 유일하다
- 암호화해서 만든 128비트짜리 문자열

- 표준 형식으로 32개의 16진수로 표현되어 총 36개 문자(32개 문자 와4개의 하이픈)으로 된
  <br>8-4-4-4-12 라는 5개의 그룹을 하이픈으로 구분하게 되며 이를 다음 다음과 같이 표기 됩니다.

  ```
  0ece7810-4d12-11ed-b88e-080027608c76
  ```

- 🐘postgreSql : thrid-party module로 추가 설치 필요

  ```
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```

- 버전
  <table>
  <tr><td>버전 1 (MAC 주소) </td><td> MAC Address, time-based version</td></tr>
  <tr><td>버전 2 (DCE 보안) </td><td> MAC Address, time-based, DCE Security version</td></tr>
  <tr><td>버전 3 (MD5 해시) </td><td> The name-based version, that uses MD5 hashing</td></tr>
  <tr><td>버전 4 (랜덤) </td><td> The randomly or pseudo-randomly generated version</td></tr>
  <tr><td>버전 5 (SHA-1 해시) </td><td> The name-based version, SHA-1 hashing</td></tr>
  </table>

## - UUID 사용하는 이유

### - MySQL

- PK 컬럼 타입에 대해서 선정시 실제 업무에 의해서 생성된 <b>본질식별자</b>
- 업무에 의해서 생성된 것은 아닌 인위적으로 식별자 역할을 위해 만들어진 <b>인조식별자</b> 로 나눠볼 수 있습니다.
- 인조식별자
  - 대표적으로 <b>AUTO_INCREMENT</b> 를 사용하는 방법이 보편적인 방법
  - UUID도 사용할 수 있다. (UUID는 본질식별자로도 사용이 가능하다.)

### - 사용하는 이유

1. 데이터베이스가 여러 개로 분리 되어 사용 되면서, 다시 합쳐 져서 사용 되는 경우

   - 하나의 ID가 현재 있는 데이터베이스뿐만 아니라 모든 데이터베이스내에서 고유 할 경우

2. 키를 회득하는데 있어서 종속적이지 않다.

   - UUID 는 함수를 호출하여 키를 생성하게 됩니다. 그에 반면에 AUTO_INCREMENT PK 는 다음 값을 알기 위해서는 조회를 해야지 그 다음 유니크 한 값을 알 수 있다.
     <br>그래서 구성상 PK 값을 사전에 회득해야하는 로직의 경우 반복적인 DB Hit(Access)(조회 후 다음 로직) 를 방지 할 수 있다는 성능적 이점이 있다.

3. 보안적

   - DB 상에서도 유추가 불가능한 값인 UUID 를 사용하는 경우 보안을 지킬 수 있다.
   - AUTO_INCREMENT 로 PK 를 사용시 단순 증가 숫자값이기 때문에
     <br>해당 값을 통해서 크롤링 등으로 다른 데이터도 추가로 수집하기 쉬우며
     <br>또한 다른 PK ID 을 유추하거나 조회를 시도할 수도 있다.
     <br>(테이블이 외부에서 URL 등에서 직접적으로 표현되는 경우 라면, 애플리케이션 구현에서 추가적인 보안사항을 통해 먼저 제한 필요)

4. 업무적인 고유한 값 또는 본질식별자 값으로 사용할 수 있습니다.
   - UUID 를 통한 고유한 값을 생성 하여 업무적인 식별자로 데이터를 입력하는 방식으로 사용
     - 예를 들어 주문번호나 체결번호, 상품등록번호나 상품고유번호 등과 같은 업무적인(비지니스와 연관된) 고유한 식별 값이 필요할때 사용이 가능하다.

### - 사용시 고려

- 컬럼사이즈 증가(Secondary Index 의 크기 증가)
- 성능적인 이슈(AUTO_INCREMENT 에 비해) , 일반적으로 무작위로 생성되며, 클러스터형 인덱스가 재조정 되도록 합니다.
- 중복 발생 가능

## - 테이블 생성

```
CREATE TABLE test(
    testUuid uuid DEFAULT uuid_generate_v4(),   >>> 🐘postgreSql
                - uuid_generate_v1() : mac address, current timestamp, random value를 조합해서 만든다.
                - uuid_generate_v1() : 로직 없이 랜덤으로 만든다.
    uuid VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY, >>> mysql
)
```

- [참고 블로그](https://hoing.io/archives/5248)
