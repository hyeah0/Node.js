# 시퀄라이즈 CRUD

## Create

- SQL

  ```
  INSERT INTO DB명.테이블명(컬럼명1,컬럼명2,...) values('컬럼1 데이터값','컬럼2 데이터값',...);
  ```

- 시퀄라이즈 쿼리

  ```
  const{모델명} = require('모델위치');
  모델명.create({
    컬럼명: '값'
    컬럼명: '값',
    ...
  })
  ```

  - 시퀄라이지 자료형태로 값을 넣어야 한다.
  - boolean일 경우 값은 true 또는 false로 작성필요

<hr>

## Read

### 1. 전체(findAll)

- SQL : `select * from DB명.테이블명;`
- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.findAll({});
  ```

<br>

### 2. 로우 한개만(findOne)

- SQL : `select * from DB명.테이블명 limit 1;`
- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.findOne({});
  ```

  <br>

### 3. 특정 컬럼만(attributes)

- SQL : `select 컬럼명1, 컬럼명2 from DB명.테이블명;`
- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.findAll({
    attributes: ['컬럼명1','컬럼명2'],
  });
  ```

  <br>

### 4. 조건에 부합한 로우만

- SQL : `select * from DB명.테이블명 where 조건;`
- 시퀄라이즈

  ```
  const{Op} = require('sequelize');
  const{모델명} = require('모델위치');

  모델명.findAll({
    attributes: ['컬럼명1','컬럼명2'],
    where:{
        // 컬럼명1 == true
        컬럼명1: true

        // 컬럼명2 > 30
        컬럼명2: {[Op.gt]:30}

        // 컬럼명1 == true or 컬럼명2 > 30
        [Op.or]: [{컬럼명1:ture}, {컬럼명2:{[Op.gt]:30} }],
    }

  });
  ```

  <br>

### 5. 정렬

- SQL : `select * from DB명.테이블명 order by 컬럼명1 asc 컬럼명2 desc;`
- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.findAll({
    order:[ ['컬럼명1','ASC'], ['컬럼명2','DESC']],
  })
  ```

  <br>

### 6. Limit, Offset

-[Limit, Offset SQL 상세보기](https://github.com/hyeah0/SmartWeb_Contents_WebApplication_developer_class/blob/main/0_MacSet/mysql/03_%ED%85%8C%EC%9D%B4%EB%B8%94READ_%ED%8E%98%EC%9D%B4%EC%A7%95%EC%8B%9C.md)

- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.findAll({
      order:[ ['컬럼명1','ASC'], ['컬럼명2','DESC']],
      limit: 1,
      offset: 1,
  })
  ```

  <br>

<hr>

## Update

- SQL

  ```
  update DB명.테이블명 set 컬럼명1 = '변경값' where 조건
  ```

- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.update(

    /* -- 변경값 설정 ---------- */
    {
    컬럼명1: '변경값',
    },

    /* -- 조건 --------------- */
    {
        where: {조건},
    }
  );
  ```

<hr>

## Delete(destory)

- SQL

  ```
  delete from DB명.테이블명 where 조건
  ```

- 시퀄라이즈

  ```
  const{모델명} = require('모델위치');
  모델명.destory({
    where: {조건},
  });
  ```

## 자주 쓰이는 연산자

<table>
    <tr><th>연산자</th><th>사용</th><th>설명</th></tr>
    <tr><td>Op.gt</td><td>A: {[Op.gt]:30}</td><td>A > 30</td></tr>
    <tr><td>Op.gte</td><td>A: {[Op.gte]:30}</td><td>A >= 30</td></tr>
    <tr><td>Op.lt</td><td>A: {[Op.lt]:30}</td><td>A < 30</td></tr>
    <tr><td>Op.lte</td><td>A: {[Op.lte]:30}</td><td>A <= 30</td></tr>
    <tr><td>Op.ne</td><td>A: {[Op.ne]:30}</td><td></td>A !== 30</tr>
    <tr><td>Op.or</td><td>[Op.or]: [{A: {[Op.gt]:30}, [B:{[Op.lt]:20}]</td><td>A >30 or B < 20</td></tr>
    <tr><td>Op.in</td><td>A : [1,2,3]<br>A: { [Op.in]: [1,2,3] } </td><td>A in (1,2,3)</td></tr>
    <tr><td>Op.notIn</td><td>A: {[Op.notIn]: [1, 2]}, </td><td>A not in (1,2,3)</td></tr>
</table>

- [연산자 공식문서](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
