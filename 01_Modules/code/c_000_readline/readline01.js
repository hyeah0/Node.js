// 실행 : node c_000_readline/readline01
// Node.js 콘솔창 입력받기

/*
 1. 한 줄 값 입력받기
    ▶︎ 모듈 가져오기 (readLine)
    ▶︎ readline 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
    ▶︎ 생성한 인터페이스 객체 변수에 값 입력 받기

    ☆ 예시
    입력 aaaa
    출력 aaaa

*/

// ▶︎ 모듈 가져오기 (readLine)
const readline = require("readline");

// ▶︎ readline 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ▶︎ 생성한 인터페이스 객체 변수에 값 입력 받기
rl.on("line", (line)=>{
    // 한 줄씩 입력 받은 값은 line에 저장된다.
    // rl.close() 필수 입력! 없을 경우 무한히 입력 받는다.
    input = line;
    rl.close();
})

rl.on('close',()=>{
    // 입력이 끝난 후 실행할 코드
    console.log(input);
    process.exit();
})

