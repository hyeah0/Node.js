## Path

<table>
    <tr>
        <th>console.log(__dirname)</th>
        <td>file 명을 포함한 절대경로</td>
    </tr>
    <tr>
        <th>console.log(__filename)</th>
        <td>file 명을 포함하지 않은 절대경로</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="2">const path = require('path')</th>
    </tr>
    <tr>
        <th>path.sep</th>
        <td>파일경로 구분자</td>
    </tr>
    <tr>
        <th>path.delimiter</th>
        <td>파일경로 환경변수 구분자</td>
    </tr>
    <tr>
        <th>path.parse</th>
        <td>파일경로를 key와 value값으로 나눔
        <br>path.parse(__filename).name
        </td>
    </tr>
    <tr>
        <th>path.basename(__filename)</th>
        <td>현재 파일명만 출력</td>
    </tr>
    <tr>
        <th>path.dirname(__filename)</th>
        <td>현재 파일명을 포함하지 않은 절대경로 출력</td>
    </tr>
    <tr>
        <th>path.extname(__filename)</th>
        <td>현재 파일의 확장자 출력</td>
    </tr>
    <tr>
        <th>path.isAbsolute(__filename)</th>
        <td>가로안의 값이 절대경로이면 true
        <br>상대경로이면 false
        </td>
    </tr>
    <tr>
        <th>path.normalize('./folder///sub')</th>
        <td>가로 값의 경로가 이상할 경우 자동 수정</td>
    </tr>
    <tr>
        <th>path.join('a','b')</th>
        <td>경로 값 추가할 경우 사용(a/b)
        <br>운영체제별 구분자 상이로 join으로 사용하기
        </td>
    </tr>
</table>
