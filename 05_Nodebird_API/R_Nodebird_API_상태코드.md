# 상태 코드

- HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려준다.
- [API 상태코드 문서(mdm web docs)](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

# Nodebird_API 응답코드

<table>
    <tr>
        <th>응답 코드</th>
        <th>메세지</th>
    </tr>
    <tr>
        <td>200</td>
        <td>JSON 데이터</td>
    </tr>
    <tr>
        <td>401</td>
        <td>유효하지 않은 토큰</td>
    </tr>
    <tr>
        <td>410</td>
        <td>새 버전 사용 요청</td>
    </tr>
    <tr>
        <td>419</td>
        <td>토큰 만료</td>
    </tr>
    <tr>
        <td>429</td>
        <td>요청 허용 횟수 초과(1분에 1번만 가능)</td>
    </tr>
    <tr>
        <td>500</td>
        <td>기타 서버 에러</td>
    </tr>
</table>
