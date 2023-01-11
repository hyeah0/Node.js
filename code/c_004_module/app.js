//실행 : node c_004_module/app

import{increase, getCount} from './counter.js';
increase();
increase();
console.log(getCount());        // 2

// 또는

import * as counter from './counter.js';
counter.increase();
console.log(counter.getCount()); // 3