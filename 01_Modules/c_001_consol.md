## console

<table>
    <tr>
        <th colspan="2">console</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>clear</td>
        <td>console.clear</td>
        <td>콘솔 초기화</td>
    </tr>
    <tr>
        <td>log</td>
        <td>console.log</td>
        <td>개발</td>
    </tr>
    <tr>
        <td>info</td>
        <td>console.info</td>
        <td>정보</td>
    </tr>
    <tr>
        <td>warn</td>
        <td>console.warn</td>
        <td>경보</td>
    </tr>
    <tr>
        <td>error</td>
        <td>console.error</td>
        <td>에러</td>
    </tr>
    <tr>
        <td>assert</td>
        <td>console.assert(조건, 실행문)</td>
        <td>조건이 참이 아닐때만 실행문 출력</td>
    </tr>
    <tr>
        <td>table</td>
        <td>console.table()</td>
        <td>표 형태로 데이터 출력</td>
    </tr>
    <tr>
        <td>dir</td>
        <td>console.dir()</td>
        <td>객체의 속성을 계층구조로 출력(JSON과 같은 트리 구조)
        <br> log 함수로 document.body 객체를 출력시 태그내용 출력
        <br> dir 함수로 document.body 객체를 출력시 객체의 속성이 출력
        </td>
    </tr>
    <tr>
        <td>time
        <br>timeEnd
        </td>
        <td>console.time('a');
        <br>console.timeEnd('a');
        </td>
        <td>time 함수, timeEnd 함수 사이에 걸린 시간 호출</td>
    </tr>
    <tr>
        <td>count
        <br>countReset
        </td>
        <td>console.count()
        <br>console.countReset();
        </td>
        <td>몇번 호출 되었는지 카운트, 카운트 초기화</td>
    </tr>
</table>

## 코드

<img src="https://github.com/hyeah0/Node.js/blob/main/01_Modules/img/c_001_console_img.png" width="80%">

- [코드 링크](https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_001_console/console.js)

```
//실행 : node C_001_console

console.log('console.log.........');
console.clear();

console.log('---------------------------------------------------------------');
console.log('log');     // 개발
console.info('info');   // 정보
console.warn('warn');   // 경보
console.error('error'); // 에러

console.log('---------------------------------------------------------------');
// assert : 특정한 조건이 참이 아닐때만 실행
console.log('console.assert')
console.assert(2===3, '2 === 3 not same');
console.assert(2===2, "2 === 2 same")

console.log('---------------------------------------------------------------');
// print object
const student = {name:'kim', age: 30, conpany: {name: 'com'}};
console.log(student);
console.table(student);
console.dir(student, {showHidden: true, colors:false, depth: 2});
console.dir(student, {showHidden: true, colors:false, depth: 0});

console.log('---------------------------------------------------------------');
console.log('console.time')
// time : 호출시까지 걸린 시간
console.time('for loop');
for(let i=0; i<10; i++){
    i++;
}
console.timeEnd('for loop');

console.log('---------------------------------------------------------------');
console.log('console.count')
// count('') : 몇번 호출 되었는지 카운트
// countReset('') : 카운트 초기화
function a(){
    console.count('a function count >>> ')
}

a();
a();
console.countReset('a function count >>> ');
a();


console.log('---------------------------------------------------------------');
console.log('console.trace')
function f1(){
    console.log('f1 함수는 f2함수를 호출')
    f2();
}
function f2(){
    console.log('f2 함수는 f3함수를 호출')
    f3();
}
function f3(){
    console.log('f3');
    console.trace();
}
f1();
```
