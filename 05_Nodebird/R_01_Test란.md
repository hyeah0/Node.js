# 테스트

- 서비스가 제대로 동작하는지 테스트

  ## 테스트 기법

  ### • 유닛 테스트

  - 프로그램의 각 부분을 고립 시켜서 각각의 부분이 정확하게 동작하는지 확인

  - 문제 발생 시 정확하게 어느 부분이 잘못되었는지를 재빨리 확인 할 수 있다.

  ### • 통합 테스트

  - 애플리케이션의 모든 구성 요소가 예상대로 함께 작동하는지 확인

  - 응용 프로그램의 다양한 모듈과 구성 요소의 통합이
    <br> 하단 3가지가 충족하는지 확인하기 위함이다.
    1. 조직의 기술
    2. 조직의 성능 요구 사항
    3. 사용자의 요구 사항

  ### • 부하 테스트

  - 임계값 한게에 도달할 때까지 시스템의 부하를 지속적으로 꾸준히 증가시켜
    <br>얼마나 많은 사용자가 동시에 사용할 수 있는지 테스트

  ### • 테스트 커버리지

  - 테스트 대상을 얼마만큼 테스트했나를 정의

  - 테스트의 정확성을 판단하는 하나의 척도가 될 수 있다.

# 테스트 준비

## 1. npm 모듈 다운

```
npm i -D jest
```

- jest : 페이스북에서 만든 오픈 소스로 테스팅에 필요한 툴들을 가지고 있다.

## 2. package.json 파일에 test 명령어 등록

<pre>
...
"main": "app.js",
"scripts": {
    "start": "nodemon app"
    <b>test: "jest"</b>
},
...
</pre>

## 3. 테스트가 필요한 폴더 안에 테스트용 파일 생성

- 파일명은 하단과 같이 만들면 된다.
    <pre>
    <b>파일명.test.확장자</b> 또는
    <b>파일명.spec.확장자</b>
  
    예시)
    middlewares index.js 파일 테스트 가정
    위치 : middlewares/
    파일명 : index.test.js </pre>

## 4. 테스트 코드 작성

- ⬇️ nodebird/폴더명/파일명.test.확장자
  <pre>
  <b>test</b>('테스트 설명', ()=>{
    <b>expect</b>(실제 코드).함수(나와야하는 결과);
  })
  
  ⭐️ 테스트 그룹이 있을 경우 ⭐️
  <b>describe</b>('그룹 설명', ()=>{
    <b>test</b>('테스트설명', ()=>{
       <b>expect</b>(실제 코드).함수(나와야하는 결과);
    });
  });
  
  예시)
  test('1+1은 2입니다.', ()=>{
    expect(1+1).toEqual(2);
  })
  
  >>> 테스트 통과
  </pre>

## 5. 테스트 코드 실행

- 콘솔창에 `npm test` 로 실행 >>> 테스트 결과를 확인할 수 있다.

  - 파일명에 test, spec 이 들어간 파일들을 모두 찾아 실행한다.

- 테스트 코드를 아무것도 작성하지 않았을때

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test01.png" width="100%">

- 테스트 코드 작성시

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test01_01.png" width="80%">

  <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird/a_md_img/i_test/test01_02.png" width="80%">

## 추가(노드 내장 모듈)

- node 18 버전에서는 내장 테스팅 모듈 test 가 도입 되었다.
  <br> 다만, jest에 비해 기능이 빈약

### - 내장모듈 사용하기

- ⬇️ node-test.mjs

  ```
  import test from 'node:test';
  import assert from 'assert';

  test('1 + 1 = 2', ()={
    assert.strictEqual(1+1, 2);
  })
  ```

- 콘솔
  ```
  node node-test.mjs
  >>> node 파일명.확장자
  ```
