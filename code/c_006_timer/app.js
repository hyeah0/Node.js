//실행 : node c_006_timer/app

let num = 1;
// 일정한 시간 별로 실행
// 1000 == 1s 
// setInterval(() => {
//     console.log(num++)
// }, 1000);
// cooment + c 누르면 중지됨

// setInterval 따로 중지시킬려면 
const interval = setInterval(() => {
    console.log(num++)
}, 1000);

// 6초 뒤에 중지
setTimeout(() => {
    console.log('timeout!')
    clearInterval(interval);
}, 6000);