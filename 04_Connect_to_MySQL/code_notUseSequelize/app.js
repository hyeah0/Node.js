console.log('mysql연결!!')

/* -- Step 1 ---------------------------------------------------------- */

// npm 설치
// npm i mysql

/* -- Step 2 ---------------------------------------------------------- */

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

/* -- Step 3 ---------------------------------------------------------- */
// DB 커넥션 생성
let connection = mysql.createConnection(conn);
// DB 접속
connection.connect();

let sql = "INSERT INTO `users` (`id`,`name`,`age`,`married`,`comment`,`created_at`) VALUES (1,'testName',10,0,'hi',default);";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});

sql = "SELECT * FROM users";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});

// DB 접속 종료
connection.end();