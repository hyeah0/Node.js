import express from 'express';
const app = express();

// request, response ---------------------------------------------------------------------------------
app.get('/test/:id',(req, res, next)=>{
    
    //http://localhost:8080/test/Emliy?query=kk 일때
    console.log(req.path);          // /test/Emliy
    //console.log(req.headers);       // ...
    console.log(req.params);        // { id: 'Emliy' }
    console.log(req.params.id);     // Emliy
    console.log(req.query);         // { query: 'kk' }
    console.log(req.query.keyword); 

    console.log('get test');
    
    // response 응답 종류
    // res.send('response!');
    // res.json({name : 'Emily'});
    // res.status(400);
    res.setHeader('key','value');
    res.status(201).send('create');
    
})

// next() --------------------------------------------------------------------------------------------
// res.send() : 콜백 함수 안에 send가 두개 실행 될 수 없다.
// 따라서 [return]을 붙여 사용한다. 예시)return res.send(); 
app.get(
    '/next',
        (req, res, next)=>{
            console.log('first');
            if(true){
                //res.send('if true');         // send가 두개일 경우 에러
                return res.send('if true');
            }
            
            res.send('first')               // 서버에 보내주면 다음줄을 실행 되지 않는다.
            //next();                       // next() : 다음 줄로 넘어간다.
            //next('route');                // next('route') : 다음 코드로 넘어간다. 
            //next(new Error('error'))        // next(new Error('error')) : 에러 던지기(에러 핸들러도 만들어야 한다.)
        },
        (req, res, next)=>{
            console.log('first2');
            next();
        }
)

app.get('/next',(req, res, next)=>{
    console.log('second');
})

// app.all vs app.use --------------------------------------------------------------------------------
// app.all : post, get으로 보내던 상관 없이 수행
// 단, /appall 작성한 외의 url이 있을 경우 처리 되지 않는다.
// /appall/* 로 작성 외의 url을 처리할 수는 있다.
app.all('/appall',(req, res, next)=>{
    console.log('app.all');
    next();
})

// app.use : /appuse 뒤에 어떤 것이 와도 수행
app.use('/appuse',(req, res, next)=>{
    console.log('app.use');
    next();
})

// 처리할 수 없는 경로 처리(안정망과 비슷)
app.use((req, res, next)=>{
    res.status(404).send('Not available!')
})

app.use((error, req, res, next)=>{
    console.error(error);
    res.status(500).send('Sorry, try later!');
})

app.listen(8080);