# res.send / res.render / res.json

## 1. res.send('')

- send에 전해진 값을 응답
- 기본적으로 response 처리를 할때 content-type을 지정 필요하나
  <br>전해진 값의 데이터 타입을 파악해 Content-type이 자동적으로 지정해 준다.
- ex) res.send('&lt;h1&gt;html 태그&lt;/h1&gt;')

## 2. res.render

- view화면을 랜더링하고 랜더링된 html을 클라이언트에 보내주는 역할.

```
res.render("ejs파일경로/html파일경로", {데이터이름표: 전송할데이터})
res.render('join', {title: '회원가입'});
ㄴ views 폴더 join.html 을 보내준다.
```

## 3. res.json()

- json 형식으로 바꾸어서 응답한다.(json 형태가 아닌것도 json 형식으로 변환)
- Content-type 헤더를 application/JSON으로 고정.
- 마지막에 res.send()를 호출.
