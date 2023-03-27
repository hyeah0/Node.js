const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () =>{
    passport.use(new LocalStrategy({ // ②
        usernameField: 'email',      // html input name
        passwordField: 'password',
        passReqToCallback: false,
        
    }, async(email, password, done) => { // ②
        try{
            console.log('[ ----- passport/localStrategy.js -----]');
            // select * from users where email = email;
            const dbUser = await User.findOne({where : {email}});
            
            // 가입자인지 확인
            if(dbUser){
                // 입력 비밀번호랑 db 비밀번호 비교
                const result = await bcrypt.compare(password, dbUser.password);
                
                if(result){
                    done(null, dbUser);                  
                }else{
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            
            }else{
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }

        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};