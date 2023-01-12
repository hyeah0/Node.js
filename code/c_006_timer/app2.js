//실행 : node c_006_timer/app2

console.log('code1');
console.time('timeout 0');
setTimeout(() => {
    console.timeEnd('timeout 0');
    console.log('setTimeout');
},1000);

console.log('code2');
setImmediate(()=>{
    console.log('setImmediate');
})

console.log('code3');
process.nextTick(()=>{
    console.log('process.nextTick');
})

// 먼저 실행되는 순서
// process.nextTick > setImmediate > setTimeout