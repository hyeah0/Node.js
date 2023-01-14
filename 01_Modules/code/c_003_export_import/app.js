//실행 : node c_003_export_import/app

// ReferenceError: count is not defined
// console.log(count);
// console.log(getCount());

// counter.js에서 export처리한 메서드를 가져오기
const counter = require('./counter.js');
counter.increase();
console.log(counter.getCount());    

// true
// false
// 1