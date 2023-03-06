const passport = require('passport');
const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');
const User = require('../models/user');

/**
 * serializeUser : 로그인시 실행
 *                 사용자 정보 객체에서 id만 추려 세션에 저장
 * 
 * deserializeUser : 요청마다 실행
 *                   세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
 *                   [app.js] -> app.use(passport.session());가 호출함
 */

module.exports = ()=>{

    passport.serializeUser((user, done)=>{ // ④
        console.log('[ ----- passport/index.js __ passport.serializeUser -----]');
        console.log(user);
        console.log(done);

        done(null, user.id);               // done(에러발생시 사용, 저장하고싶은 데이터 저장)
    });
  
    passport.deserializeUser((id, done) => { // serializeUser 에서 user.id를 id로 받아 사용자 정보 조회
        console.log('[ ----- passport/index.js __ passport.deserializeUser -----]');

        // select * from users where id = id
        User.findOne({where: {id}})
            .then(user => done(null, user)) // req.user로 로그인한 사용자 정보를 가져올 수 있다.
            .catch(err => done(err));
    });

    local();
    //kakao();
};