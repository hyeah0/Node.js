// 실행 : node c_000_readline/readline02
// Node.js 콘솔창 입력받기

/*
 1. 공백을 구분하여 값 입력 받기
    ▶︎ 모듈 가져오기 (readLine)
    ▶︎ readline 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
    ▶︎ 입력 받은 값을 공백 기준으로 나누기

    ☆ 예시
    입력 1 2 3  
    출력
        1
        2
        3
*/


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (line)=>{
    // 공백 기준으로 텍스트를 나눠 map에 저장
    input = line.split(' ').map(el => parseInt(el));
    
    rl.close();
})

rl.on('close',()=>{
    // map 형식으로 저장된 input을 하나씩 출력 
    input.forEach(el=>{
        console.log(el);
   })

    process.exit();
})
