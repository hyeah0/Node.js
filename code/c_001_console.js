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