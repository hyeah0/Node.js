## File

<table>
    <tr>
        <th colspan="2">const fs = require('fs')</th>
    </tr>
    <tr>
        <th>fs.renameSync('기존파일명', '새로변경될 이름')</th>
        <td>
            <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_008_file/app.js">
                이름변경하기(동기)
            </a>
        </td>
    </tr>
    <tr>
        <th>fs.rename('기존파일명', '새로변경될 이름', 콜백함수)</th>
        <td>이름변경하기(비동기)</td>
    </tr>
    <tr>
        <th>fs.readFile('읽을 파일명', '인코딩')
        <br> .then((data) => console.log(data))
        <br> .catch(console.error);
        </th>
        <td>
            <a href="https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_008_file/app2.js">
                파일 읽기
            </a>
        </td>
    </tr>
    <tr>
        <th>fs.writeFile('파일명', '파일 안 작성할 메세지')</th>
        <td>파일 안에 메세지 작성</td>
    </tr>
    <tr>
        <th>fs.appendFile('파일명', '추가 메세지')</th>
        <td>파일안에 추가 메세지 작성</td>
    </tr>
    <tr>
        <th>fs.copyFile('복사할 파일', '복사 후 지정할 파일명')</th>
        <td>파일 복사</td>
    </tr>
    <tr>
        <th>fs.mkdir('폴더명')</th>
        <td>폴더생성(이미 동일한 이름의 폴더가 있으면 생성하지 않는다.)</td>
    </tr>
    <tr>
        <th>fs.readdir('./')</th>
        <td>경로에 있는 파일 이름 가져오기</td>
    </tr>
</table>
- 파일명을 작성할때 상대경로로 작성하기 (ex './text.txt')


### - 콜백 함수

1. 다른 함수의 인자로써 이용되는 함수.
2. 어떤 이벤트에 의해 호출되어지는 함수.

## - ⭐️ 파일명 변경시

- renameSync : 동기

  - 에러날 경우 다음 코드로 넘어가지 않는다.
    <br>따라서 try catch와 같이 사용한다.
  - 비권장

- rename : 비동기



