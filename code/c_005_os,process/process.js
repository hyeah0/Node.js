//실행 : node c_005_os,process/process

// 현재 동작하고있는 노드의 프로세스를 받아올 수 있다.
const process = require('process');

// 모든 코드가 수행되고 나서 0 초있다가 콜백함수 수행
setTimeout(()=>{
    console.log('setTimeout');
},0)

// 현재 수행된 코드가 완료가 된 다음 등록한 콜백함수를 테스크 큐에 넣을때 사용 
process.nextTick(()=>{
    console.log('nextTick');
})

for(let i=0; i<10; i++){
    console.log(i);
}

// for문 실행 >> nextTick >> settimeout

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());
