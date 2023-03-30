## 리소스 요청 제한 관련 정책 두가지

- CORS(Cross-Origin Resource Sharing) : 다른 출처간 리소스 공유
- SOP(Same-Origin Policy) : 같은 출처간 리소스 공유

### - 출처란?

- <b>프로토콜 & 호스트 & 포트번호</b> 를 합쳐놓은것
  <br>3가지가 동일해야 같은 출처라 볼 수 있다.

  ```
  http://www.test.com/path?query=1&string=abc#kk
  ----  ------------  ---- ----------------- ---
  |         |          |           |          |
  protocal  |          |           |          |
          host       path     Query String    |
                                              fragment
                  ------
                    |
                포트번호(생략가능)
  ```

# CORS

- <b>C</b>ross <b>O</b>rigin <b>R</b>esource <b>S</b>haring

  - 다른 출처간의 리소스 공유

## - CORS의 작동 흐름

- 서로 다른 출처를 가진 리소스를 안전하게 사용 하기

- 웹 클라이언트 어플리케이션 >> 다른 출처의 리소스를 요청시

  - HTTP 프로토콜을 사용하여 요청

    1. <b>브라우저</b>는 <b>요청 헤더</b>의 <b>Origin</b> 필드에 <b>요청을 보내는 출처</b>를 담아 서버에 요청

    2. <b>서버</b>는 요청에 응답시 <b>응답 헤더</b>의 <b>Access-Control-Allow-Origin</b>에 <b>허용된 출처의 주소</b>를 담는다. (이 주소는 내 리소스 가져가는걸 허용할꺼야)

    3. <b>응답을 받은 브라우저 Origin 값과 Access-Control-Allow-Origin 값을 비교</b>

<br>

## - CORS의 작동 3가지 시나리오

- 예비 요청 (Preflight Request)
- 단순 요청 (Simple Request)
- 인증된 요청 (Credentialed Request)

### - 예비 요청 (Preflight Request)

#### - 예비 요청 작동 흐름

- 기본 작동 흐름
    <pre><b>[브라우저]</b> >> 요청 >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b></pre>

- 예비 요청 작동 흐름

    <pre>
    1. <b>[브라우저]</b> >> ⭐️ 예비요청 >> <b>[서버]</b> >> 응답 >> <b>[서버]</b>
    2. 안전한 요청인지 확인
    3. <b>[브라우저]</b> >> 본요청 >> <b>[서버]</b> >> 응답 >> <b>[서버]</b></pre>

- ⭐️ 예비 요청 보내는 것을 <b>Preflight</b> 라고 부른다.

  - <b>예비요청시에 HTTP 메서드</b>를 GET, POST가 아닌 <b>OPTIONS 메서드</b>가 사용된다.

#### - 예비 요청 단점

- 소요 시간이 늘어난다 >> 성능에 문제
- API 호출 수가 많아진다 >> 많은 비용 발생

#### - 보완 : 브라우저 캐시를 이용

- 브라우저 캐시에 요청응답이 있는 지 확인
  <pre>
  - 1-1. 저장되어있는 응답 없을 경우
      0. <b>[브라우저]</b> >> 요청 >> <b>[브라우저 캐시]</b>
      1. <b>[브라우저]</b> >> ⭐️ 예비요청 >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b>
      2. 안전한 요청인지 확인 & 응답 브라우저 캐시에 저장
      3. <b>[브라우저]</b> >> 본요청 >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b>
  
  - 1-2. 저장되어있는 응답 있을 경우
      0. <b>[브라우저]</b> >> 요청 >> <b>[브라우저 캐시]</b>
      3. <b>[브라우저]</b> >> 본요청 >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b>
  </pre>

- [브라우저 캐시 참고 블로그\_Inpa Dev](https://inpa.tistory.com/entry/HTTP-%F0%9F%8C%90-%EC%9B%B9-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EC%BA%90%EC%8B%9C-%EC%A0%84%EB%9E%B5-Cache-Headers-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

<hr>

### - 단순 요청 (Simple Request)

#### - 단순 요청 작동 흐름

- 예비 요청을 생략하고 바로 서버에 요청
- <pre><b>[브라우저]</b> >> 요청 >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b></pre>

#### - 단순 요청 조건

1. 요청 메소드는 GET, HEAD, POST 중 하나야 한다.
2. Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width 헤더일 경우 에만 적용
3. Content-Type 헤더가 application/x-www-form-urlencoded, multipart/form-data, text/plain중 하나여야한다.

- ⭐️ 세가지 조건을 모두 만족하지 않을 경우 예비 요청으로 동작된다.
- 대부분 HTTP API 요청은 text/xml 또는 application/json 으로 통신하기 때문에
  <br>3번째 Content-Type이 위반되어 대부분 API 요청은 예비 요청으로 이루어 진다.

<hr>

### - 인증된 요청 (Credentialed Request)

<pre><b>[브라우저]</b> >> 요청(자격 인증 정보(Credential)를 같이 보냄) >> <b>[서버]</b> >> 응답 >> <b>[브라우저]</b></pre>

- 클라이언트가 서버에게 요청시 <b>자격 인증 정보</b>를 같이 보냄
  - 자격 인증 정보란?
    - 세션ID가 저장되어있는 쿠키(Cookie) 또는 Authorization 헤더에 설정하는 토큰 값을 뜻한다.

#### - 인증된 요청 작동 방식

##### 1. 브라우저 설정

- 기본적으로 브라우저가 제공하는 요청 API 들은 별도의 옵션 없이 브라우저의 쿠키, 인증 관련된 데이터를 요청 데이터에 함부로 담지 않도록 되어있다.
- 단, <b>credentials 옵션</b>을 사용하면 인증 관련 정보를 담을 수 있다.
  <br>(별도 설정 없을 경우 인증정보 서버에게 전송 안됨)

  - credentials 옵션 사용 가능 값 3가지

      <table>
      <tr>
      <th>옵션값</th>
      <th>설명</th>
      </tr>
      <tr>
      <td>same-origin<br>default</td>
      <td>같은 출처간 요청에만 인증정보를 담을 수 있다.</td>
      </tr>
      <tr>
      <td>include</td>
      <td>모든 요청에 인증정보를 담을 수 있다.</td>
      </tr>
      <tr>
      <td>omit</td>
      <td>모든 요청에 인증정보를 담지 않는다.</td>
      </tr>
      </table>

##### 2. 서버 설정

- 응답 헤더 설정시

  1. <b>Access-Control-Allow-Credentials</b> 항목을 <b>true</b>로 설정해야 한다.
  2. <b>Access-Control-Allow-Origin</b> 의 값에 와일드카드 문자<b>("\*")는 사용할 수 없다.</b>
  3. <b>Access-Control-Allow-Methods</b> 의 값에 와일드카드 문자<b>("\*")는 사용할 수 없다.</b>
  4. <b>Access-Control-Allow-Headers</b> 의 값에 와일드카드 문자<b>("\*")는 사용할 수 없다.</b>

<br>
<hr>

- [참고한 블로그1_Inpa Dev](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)
- [참고한 블로그2](https://evan-moon.github.io/2020/05/21/about-cors/)
