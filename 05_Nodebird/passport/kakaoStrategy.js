const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () =>{
    passport.use(new KakaoStrategy(
        {
        clientID: process.env.KAKAO_ID,         // 카카오에서 발급해주는 아이디
        callbackURL: '/auth/kakao/callback',    // 카카오로 부터 인증받을 라우터 주소  
        },
        async (accessToken, refreshToken, profile, done ) => {
            // accessToken : 로그아웃 요청 보내기 위해 필요
            // profile : 사용자 정보
            
            console.log('[ ------ passport/kakakoStrategy.js __ kakao profile ----- ]');
            try{
                // 기존 카카오로 회원가입 회원 확인
                const dbUser = await User.findOne({ where: {snsId: profile.id, provider: 'kakao'}});
                
                // 유저 정보에 토큰 정보 추가
                dbUser.accessToken = accessToken;

                if(dbUser){
                    done(null, dbUser);
                
                }else{
                    const newUser = await User.create({
                        email: profile._json?.kakao_accout?.email,
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    });
                    done(null, newUser);
                
                }
            }catch(err){
                console.error(err);
                done(err);
            }
        }
    ));
};