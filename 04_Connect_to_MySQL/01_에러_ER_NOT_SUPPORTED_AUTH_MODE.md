<img src="https://github.com/hyeah0/Node.js/tree/main/04_Connect_to_MySQL/img/error_not_supported_auth.png" width="100%">

- Node 와 MySQL 연동시 에러가 난다면?
  1. [iterm mysql 접속](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mysql/00_%ED%84%B0%EB%AF%B8%EB%84%90%EC%97%90%EC%84%9Cmysql%EC%A0%91%EC%86%8D%EB%B0%A9%EB%B2%95.md)
  2.
  ```
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호';
  ```
  3. 터미널에 하단처럼 나오면 끝!
  ```
  Query OK, 0 rows affected (0.00 sec)
  ```
