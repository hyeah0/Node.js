## this

<table>
    <tr><td>일반 함수 안 this</td> <td>global</td></tr>
    <tr><td>화살표 함수 안 this</td> <td>modul.exports</td></tr>
    <tr><td>클래스 안의 함수 안 this</td> <td>클래스객체</td></tr>
    <tr><td>전역 범위 this</td> <td>module.exports</td></tr>
</table>

- 브라우저 콘솔 상에는 전역 범위에서 쓰인 this는 global(window) 지만
  <br> node.js 에서는 modul.exports 이다.

## 코드

```
//실행 : node C_002_this

console.clear();

// 함수안에서 this 호출시 global 이다.
console.log('------- 일반 함수 속 this -------')
function hello(){
    console.log(this);
    console.log('hello', this === global);          // true
    console.log('hello', this === module.exports);  // false
}
hello();

console.log('------- 화살표 함수 속 this -------')
const b = () => {
    console.log(this);                              // {}
    console.log('b', this === global);              // false
    console.log('b', this === module.exports);      // true
};

b();

// 클래스 안에서 함수의 this는 클래스를 가르킨다.
class A{
    constructor(num){                   // constructor(인자) == 인자 생성자
        this.num = num;
    }
    apple = 'apple';

    memberFunction(){
        console.log('------- class -------');
        console.log(this);              // A { apple: 'apple', num: 1 }
        console.log(this === global);   // false
        console.log(this === module.exports);   // false
    }
}

const a = new A(1);
a.memberFunction();


console.log('------- global scope -------')
console.log(this);                       // {}
console.log(this === global);            // false
console.log(this === module.exports);    // true

```
