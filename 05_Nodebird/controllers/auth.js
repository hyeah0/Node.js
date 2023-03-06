const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

/* --------------------------------------------------------------------------------------
    회원 가입 컨트롤러
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

        // 비밀번호는 암호화 해서 저장
        // bcrypt 모듈 사용
        // hash(인수1, 인수2) : 인수1을 인수2 만큼 반복
        const hash = await bcrypt.hash(password, 12);
        // await User.create({
        //     email, nick, password: hash,
        // });

        const inputsql = `insert into users values( default, '${email}', '${nick}', '${hash}', default, '', default, default )`;
        await sequelize.query(inputsql, { type: QueryTypes.SELECT });

        return res.redirect('/');

    }catch(err){
        console.error(err);
        return next(err);
    }
}  

/* --------------------------------------------------------------------------------------
    로그인 컨트롤러
 ---------------------------------------------------------------------------------------- */
 exports.login = (req, res, next) =>{
    passport.authenticate('local', (authError, user, info)=>{
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
        return req.login(user, (loginError) =>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });

    })(req, res, next);
 };

 /* --------------------------------------------------------------------------------------
    로그아웃 컨트롤러
 ---------------------------------------------------------------------------------------- */
exports.logout = (req, res) =>{
    req.logout(()=>{
        res.redirect('/');
    });
};