// 실행 : node c_000_readline/readline04
// Node.js 콘솔창 입력받기

/*
 1. 공백이 포함된 여러줄 입력 받기
    ▶︎ 모듈 가져오기 (readLine)
    ▶︎ readline 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
    ▶︎ 공백을 구분하여 배열에 값 넣기
    ▶︎ 입력 종료 ctrl + c

    ☆ 예시
    입력 
        1 2 a
        3 4 5 b c 
    출력
        [['1','2','a'], ['3','4','5','b','c']]
*/


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 값을 받아올 배열형 변수
let inputArr = []

rl.on("line", (line)=>{
    // 생성한 변수에 공백을 구분하여 저장
    inputArr.push(line.split(' '));
})

rl.on('close',()=>{
    console.log(inputArr)
    process.exit();
})
