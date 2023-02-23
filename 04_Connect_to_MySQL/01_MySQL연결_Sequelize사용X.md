# Node.js MySQl 연결

1. npm mysql 확장 모듈 설치
2. 확장모듈 포함 및 DB Connection 정보 설정
3. DB Connection 생성 및 쿼리 실행, DB 접속 종료

- user테이블에 데이터를 넣고 테이블을 읽기
- ERD
  <img src="https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mysql/image/terminal/foreignKey.png" width="100%">

- 결과

    <img src="https://github.com/hyeah0/Node.js/blob/main/04_Connect_to_MySQL/img/readData.png" width="100%">

## 1. npm mysql 확장 모듈 설치

```
npm i mysql
```

## 2. 확장모듈 포함 및 DB Connection 정보 설정

```
// mysql 모듈 로드
const mysql = require('mysql');

// mysql 접속 설정
const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'mysql 워크벤치 설치할때 설정한 비밀번호',
    database: 'DB이름'
};
```

## 3. DB Connection 생성 및 쿼리 실행, DB 접속 종료

```
// DB 커넥션 생성
let connection = mysql.createConnection(conn);
// DB 접속
connection.connect();

// 쿼리문 작성
let sql = "INSERT INTO `users` (`id`,`name`,`age`,`married`,`comment`,`created_at`) VALUES (1,'testName',10,0,'hi',default);";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});

// 데이터 읽어오기
sql = "SELECT * FROM users";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});

// DB 접속 종료
connection.end();
```
