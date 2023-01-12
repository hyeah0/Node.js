//실행 : node c_008_file/app2

// 파일시스템의 promiss를 가리킨다.
const fs = require('fs').promises;

// reading a file
// incoding(utf8)을 따로 하지 않으면 buffer에 있는 값을 보여준다.
fs.readFile('./text.txt', 'UTF8')
  .then((data) => console.log(data))
  .catch(console.error);

// 파일안에 메세지 작성
// fs.writeFile('파일명', '작성할 메시지')
fs.writeFile('./file.txt', 'Hello, Dream Coders! :) ')
  .catch(console.error);

// 기존 파일에 메세지 추가
// fs.appendFile('파일명', '추가 메세지')
fs.appendFile('./file.txt', 'hey')
  .catch(console.error);

// copy
// fs.copyFile('복사할 파일', '복사후 지정할 파일명')
fs.copyFile('./file.txt', './file2.txt')
  .catch(console.error);

// 메세지가 들어있는 파일을 복사
// 순서가 중요할 경우에는 then 안에서 실행
fs.appendFile('./file.txt', 'hey')
  .then(()=>{
    fs.copyFile('./file.txt', './file3.txt')
    .catch(console.error);
  })  
  .catch(console.error);


// 새로 folder 만들기(이미 폴더가 있다면 만들지 않는다.)
fs.mkdir('sub-folder')
  .catch(console.error);

// 해당하는 경로에 있는 모든 파일 이름 가져오기
fs.readdir('./')
  .then(console.log('-------- 모든 파일 가져오기 -----------------'))
  .then(console.log)
  .catch(console.error);
