const passport = require('passport');
const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = ()=>{

    /**
     * serializeUser : 사용자 정보 객체에서 id만 추려 세션에 저장
     * deserializeUser : 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
     */

    // serializeUser : 로그인시 실행, 사용자 정보가 들어있다.
    passport.serializeUser((user, done)=>{  // (serializeUser((매개변수, 함수명)))
        done(null, user.id);    // done(에러발생시 사용, 저장하고싶은 데이터 저장)
    });

    // deserializeUser : 요청마다 실행
    // app.js 파일의 app.use(passport.session());가 하단 메서드를 호출 한다.
    // serializeUser 에서 저장했던 user.id를 id로 받아 사용자 정보 조회
    // req.user를 통해 로그인한 사용자 정보를 가져올 수 있다.
    passport.deserializeUser((id,done)=>{
        User.findOne({where: {id}})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    //kakao();
};