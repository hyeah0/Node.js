//실행 : node c_007_path/app

// 현재 파일의 위치
const path = require('path');
console.log(__dirname);     // file 명을 포함한 절대경로 
console.log(__filename);    // file 명을 포함하지 않은 절대경로 

console.log('-------- 구분자 -------------------')
console.log(path.sep);      // [/] 패스구분자
console.log(path.delimiter);// [:] 패스 환경변수 구분자

// basename api : 특정 경로의 파일명만 출력
console.log('-------- basename ---------------')
console.log(path.basename(__filename)); // app.js

// dirname : 디렉토리 이름만 출력
console.log('-------- dirname ----------------')
console.log(path.dirname(__filename));  // /Users/___/___/node/Node.js/code/c_007_path

// extension : 확장자만 출력 >>> .js
console.log('-------- extension --------------')
console.log(path.extname(__filename));  // .js

// parse 
console.log('-------- parse ------------------')
const parsed = path.parse(__filename);
console.log(parsed);
console.log(parsed.root);                   // /
console.log(parsed.name);                   // app
console.log(path.parse(__filename).name);   // app

// string 형태
console.log('-------- stringfy ---------------')
const str = path.format(parsed);
console.log(str);

// 절대경로, 상대경로 확인
// 절대경로면 true, 상대경로이면 false
console.log('-------- isAbsolute -------------')
console.log('isAbsoulute?', path.isAbsolute(__dirname));    // true
console.log('isAbsoulute?', path.isAbsolute('../'));        // false

// normalize
// 경로가 이상할경우 자동 수정
console.log('-------- normalize -------------')
console.log(path.normalize('./folder///sub'));              // folder/sub

// join
console.log('-------- join -----------------')
console.log(__dirname + '/' + 'image');
console.log(path.join(__dirname,'image'));
// 운영 체제별 구분자가 다를 수 있어 join을 사용 하기
// 윈도우 구분자 : [\] 
// 맥 구분자 : [/]