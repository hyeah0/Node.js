# 쿠키 & 세션

- [자바 쿠키 & 세션 참고 링크](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/5_web/06_Spring/07_Cookie&Session/README.md)

## node.js 쿠키

<table>
    <tr>
        <td colspan="2">
        res.writeHead(상태번호(200~), { 'Set-Cookie': 옵션 });
        </td>
    </tr>
    <tr>
        <td colspan="2">
        res.writeHead(302, {Location: '/',
        <br>'Set-Cookie': `name=kim'; Expires=${expires.toGMTString()}; Path=/`; HttpOnly});
        </td>
    </tr>
    <tr><th>옵션종류</th><th>설명</th></tr>
    <tr>
        <td>key=value</td>
        <td>쿠키명과 쿠키값</td>
    </tr>
    <tr>
        <td>Expires=날짜</td>
        <td>쿠키 만료기한(설정 날짜가 되면 쿠키 제거)</td>
    </tr>
    <tr>
        <td>Max-age=초</td>
        <td>몇 초뒤에 쿠키 제거</td>
    </tr>
    <tr>
        <td>Domain=도메인명</td>
        <td>쿠키가 전송될 도메인을 정할 수 있다.
        <br>기본값은 현재 도메인이다.
        </td>
    </tr>
    <tr>
        <td>Path=URL</td>
        <td>쿠키가 전송될 URL을 정할 수 있다.
        <br>기본값은 '/' 이고 이 경우에 모든 url에서 쿠키를 전송 할 수 있다.
        </td>
    </tr>
    <tr>
        <td>Secure</td>
        <td>HTTPS 일 경우에만 쿠키가 전송된다.</td>
    </tr>
    <tr>
        <td>HttpOnly</td>
        <td>자바스크립트에서 쿠키에 접근할 수 없다.
        <br>쿠키 조작 방지를 위해 설정하는 것이 좋다.
        </td>
    </tr>
</table>

## node.js 쿠키 만들기

<img src="https://github.com/hyeah0/Node.js/blob/main/03_Server_REST_Cookie_Session_Cluster/03_Cookie_Session/img/makeCookie.png" width="100%">

```
const http = require('http');

http.createServer((req, res) => {

  console.log(req.url);             // favicon.ico
  console.log(req.headers.cookie);  // mycookie=test

  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
})

  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });

```
