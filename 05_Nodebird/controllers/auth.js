const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const axios = require('axios');

const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

/* --------------------------------------------------------------------------------------
    회원 가입 컨트롤러(/auth/join)
 ---------------------------------------------------------------------------------------- */
exports.join = async(req, res, next) =>{
    const {email, nick, password} = req.body;

    try{
        // const exUser = await User.findOne({where : {email}});
        const sql = `select * from users where email = '${email}'`;
        const exUser = await sequelize.query(sql, { type: QueryTypes.SELECT });
    
        // 이미 가입한 이메일이 있을 경우
        if(exUser.length>0){
            return res.redirect('/join?error=exist');
        }

        // bcrypt 모듈 : 비밀번호 암호화 해서 저장
        // hash(인수1, 인수2) : 인수1을 인수2 만큼 반복
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email, nick, password: hash,
        });

        return res.redirect('/');

    }catch(err){
        console.error(err);
        return next(err);
    }
}  

/* --------------------------------------------------------------------------------------
    로그인 컨트롤러(/auth/login)
    ① controllers/auth.js
    ② passport/localStrategy.js
    ③ controllers/auth.js
    ④ passport/index.js
    ⑤ controllers/auth.js
 ---------------------------------------------------------------------------------------- */
 exports.login = (req, res, next) =>{   // ①

    passport.authenticate('local', (authError, user, info) => { 
    // ③ 
        console.log('[ ----- controllers/auth.js passport.authenticate -----]');
        
        // 에러일경우
        if(authError){
            console.error(authError);
            return next(authError);
        }

        // 로그인 하지 않은 상태일경우
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }

        // [passport/index.js] passport.serializeUser 호출
        return req.login(user, (loginError) =>{ // ⑤

            console.log('[ ----- controllers/auth.js req.login -----]');
            
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });

    })(req, res, next);
 };

 /* --------------------------------------------------------------------------------------
    로그아웃 컨트롤러(/auth/logout)
 ---------------------------------------------------------------------------------------- */
exports.logout = async(req, res, next) =>{

    console.log('[ ----- controllers/auth.js __ logout ----- ]')
    
    // 카카오톡 로그인 유저일 경우
    const ACCESS_TOKEN = res.locals.user.accessToken;

    if(ACCESS_TOKEN){
        
        try{
            console.log('카카오톡 로그아웃 실행');

            let logout = await axios({
                method:'post',
                url:'https://kapi.kakao.com/v1/user/unlink',
                headers:{
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });

        }catch (error) {
            console.error(error);
            next(error);
        }
    }

    // 세션 정리
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });

};
