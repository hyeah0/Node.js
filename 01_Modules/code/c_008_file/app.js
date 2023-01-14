//실행 : node c_008_file/app

// 파일 시스템 가져오기
const fs = require('fs');

// 3가지 방법
// rename(...., callback(error, data)) >>> 비동기
// try { renameSync(....) } catch(e) { } >>> 동기 renameSync 따로 콜백함수가 제공되지 않아 try catch 와 같이 사용
// promises.rename().then().catch(0)

// 비사용권장 : 에러날경우 다음 코드로 넘어가지 않음
try {
  //fs.renameSync('기존이름', '새로변경될 이름');
  fs.renameSync('./text.txt', './text-new.txt');
} catch (error) {
  console.error(error);
}

//fs.rename('기존이름', '변경이름', 콜백함수);
fs.rename('./text-new.txt', './text.txt', (error) => {
  console.log(error);
});
console.log('hello');

fs.promises
  .rename('./text2.txt', './text-new.txt') //
  .then(() => console.log('Done!'))
  .catch(console.error);
