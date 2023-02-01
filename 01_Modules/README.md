## Module

- 독립된 기능을 갖는 것(함수, 파일)들의 모임
- <b>외장 모듈</b>과 <b>내장 모듈</b>로 나누어 져 있다.

### - 외장 모듈

- 일반 Node.js 개발자들이 만들어 놓은 모듈(라이브러리)
- 외장 모듈을 사용하기 위해서는 npm( Node Package Manager )을 사용

### - 내장 모듈

- Node.js를 설치하고 나면 그 안에 이미 제공되어지는 모듈을 의미
- 내장 모듈은 이미 Node.js를 설치할 때 존재하기 때문에 npm을 사용하지 않는다.

### - 내장 모듈 불러오기

- const 변수명 = require("내장모듈명")
  <br> `예시 ) const os = require('os')`

  <table>
    <tr>
      <th>모듈명</th>
      <th>설명</th>
      <th>코드링크</th>
    </tr>
    <tr>
      <td>os</td>
      <td>운영체제 및 관련 유틸리티에 대한 메서드와 프로퍼티 정보 확인</td>
      <td>
        <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_005_os%2Cprocess/os.js">
          링크
        </a>
      </td>
    </tr>
    <tr>
      <td>process</td>
      <td>프로그램과 관련된 정보</td>
      <td>
        <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_005_os%2Cprocess/process.js">
          링크
        </a>
      </td>
    </tr>
    <tr>
      <td>path</td>
      <td>파일 위치(경로)</td>
      <td>
        <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_007_path/app.js">
          링크
        </a>
      </td>
    </tr>
    <tr>
      <td>fs</td>
      <td>파일시스템(파일명, 파일추가..)</td>
      <td>
        <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/c_008_file.md">
          정리링크
        </a>
      </td>
    </tr>
    <tr>
      <td>readline</td>
      <td>console 창에서 값 입력받기</td>
      <td>
        <a href="https://github.com/hyeah0/Node.js/tree/main/01_Modules/code/c_000_readline">
          링크
        </a>
      </td>
    </tr>
    <tr>
      <td>events</td>
      <td>이벤트 처리</td>
      <td>-</td>
    </tr>
    <tr>
      <td>url</td>
      <td>url 객체화 >> url.parse()
      <br>url 직렬화(String) >> url.format()
      </td>
      <td>-</td>
    </tr>
  </table>
