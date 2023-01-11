//실행 : node c_003_module/counter

let count =0;

function increase(){
    count++;
}
function getCount(){
    return count;
}

module.exports.getCount = getCount;
module.exports.increase = increase;

// module 생략 가능하나 exports를 다른 오브젝트를 할당하면 안된다.
console.log(module.exports === exports);    // true
exports = {};
console.log(module.exports === exports);    // false

