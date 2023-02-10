/* middleware
    미들웨어         : app.use((req, res, ⭐️next⭐️) => { ⭐️next()⭐️ });  
    에러 처리 미들웨어 : app.use((⭐️err⭐️, req, res, next) => {});

    next();                     : 다음 줄로 넘어간다.
    next('route');              : 다음 코드로 넘어간다. 
    next(new Error('error'))    : 에러 던지기(에러 핸들러도 만들어야 한다.)
*/

const express = require('express');
const app = express();

/* ------------------------------------------------------------------------------- */
// next 처리 순서
/* ------------------------------------------------------------------------------- */
app.get('/next',(req, res, next)=>{
            
        if(true){
            // ①
            console.log('first');
            next();
        }
        
        // if절 true로 res.send는 실행 되지 않는다.
        res.send('first')
       
    },(req, res, next)=>{
        // ②
        console.log('first2');
        next();
    }
);

app.get('/next',(req, res, next)=>{
    // ③
    console.log('second');
})

/*
    first
    first2
    second
*/

/* ------------------------------------------------------------------------------- */
// next 처리순서 2
/* ------------------------------------------------------------------------------- */
app.get('/next2',(req, res, next)=>{
        
    let a = 2;
    if(a>3){
        console.log('first');
        res.send('a는 n보다 큽니다 : true');

    }else{
        next();
    }
   
},(req, res, next)=>{
    console.log('first2');
    next();
}
);

app.get('/next2',(req, res, next)=>{
    console.log('second');
    res.send('a는 n보다 큽니다 : false');
})

/*
   if문에서 true 일때
    first

   if문에서 false 일때
    first2
    second
*/

/* ------------------------------------------------------------------------------- */
// next route 처리 순서
/* ------------------------------------------------------------------------------- */
app.get('/route',(req, res, next)=>{
            
    if(true){
        // ①
        console.log('first');
        next('route');
    }
    
    // if절 true로 res.send는 실행 되지 않는다.
    res.send('first')
   
},(req, res, next)=>{
    // next('route') 로 하단 코드는 실행 되지 않는다
    console.log('first2');
    next();
}
);

app.get('/route',(req, res, next)=>{
    // ②
    console.log('second');
})

/*
    first
    second
*/



app.listen(3000, ()=>{ console.log('미들웨어 next 처리 순서')});