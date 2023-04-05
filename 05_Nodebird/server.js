const app = require('./app');

/** -- 앱 포트에 연결 -- */
app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중.. app.js');
});
