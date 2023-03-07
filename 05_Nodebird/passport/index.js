const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
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

        if(user.accessToken){
            console.log('카카오톡 로그인 유저입니다.');
            done(null, {id: user.id, accessToken: user.accessToken });  
        
        }else{
            console.log('로컬 로그인 유저입니다.');           
            done(null, {id: user.id});    // done(에러발생시 사용, 저장하고싶은 데이터 저장)
        }     
    });
  
    // serializeUser 에서 아이디와 토큰 정보 받아옴(토큰정보는 카카오톡 로그인일 경우에만 해당) 
    // userdata.id = user id / userdata.accessToken = accessToken
    passport.deserializeUser((userdata, done) => { 
       
        console.log('[ ----- passport/index.js __ passport.deserializeUser -----]');
        const id = userdata.id;

        User.findOne({where: {id}})
            .then((user) => {

                if(userdata.accessToken){
                    console.log('카카오톡 로그인 유저입니다.');
                    user.accessToken = userdata.accessToken;
                }

                done(null, user);   // req.user로 로그인한 사용자 정보를 가져올 수 있다.
            })
            .catch((error) => done(error)); 

    });

    local();
    kakao();
};