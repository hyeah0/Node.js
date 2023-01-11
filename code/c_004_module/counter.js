//실행 : node c_004_module/counter

let count =0;

export function increase(){
    count++;
}
export function getCount(){
    return count;
}
