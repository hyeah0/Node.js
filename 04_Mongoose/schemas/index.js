const mongoose = require('mongoose');

const connect = () =>{

    // 개발 환경일때만 콘솔을 통해 몽구스가 생성하는 쿼리내용을 확인하는 코드
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    // 몽구스와 몽고디비를 연결
    // 접속을 시도하는 주소의 데이터베이스 : admin
    // 실제로 사용할 데이터 베이스 : nodejs
    mongoose.connect('mongodb://name:password@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
    }).then(() => {
        console.log("몽고디비 연결 성공");
    }).catch((err) => {
        console.error("몽고디비 연결 에러", err);
    });
};

// 몽구스 커넥션 이벤트 리스너
// 에러 발생시 에러내용 기록
mongoose.connection.on('error', (error)=>{
    console.error('몽고디비 연결 에러', error);
});

// 연결 종료 될 경우 재 연결 시도
mongoose.connection.on('disconnected', ()=>{
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
    connect();
});

module.exports = connect;

// -------------------



  