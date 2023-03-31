const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const{ Domain } = require('../models');

// ⭐️ 로그인 되어있을 경우 ---------------------------------------
exports.isLoggedIn = (req, res, next) =>{
    
    // 로그인 유무 확인
    if(req.isAuthenticated()){
        next();
    }else{
        //res.status(403).send('로그인 필요');
        res.redirect('/');
    }
}

// ⭐️ 로그인 되어있지 않은 경우 -----------------------------------
exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태 입니다.');
        res.redirect(`/?error=${message}`);
    }
};

// ⭐️ jwt 토큰확인 --------------------------------------------
exports.verifyToken = (req, res, next)=>{
    try{
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();

    }catch(err){
        if(err.name === 'TokenExpiredError'){   // 유효기간 초과
            return res.status(419).json({
                code: 419,  // 유효기간 초과시 419 상태코드 응답, 400번대에서 마음대로 선택 가능
                message: '토큰이 만료되었습니다.',
            });
        }
    }

    return res.status(401).json({
        code:401,
        message: '유효하지 않은 토큰입니다.',
    });
}

// ⭐️ 요청 횟수 제한 -------------------------------------------
exports.apiLimiter = rateLimit({
    windowMs: 60 * 1000,    // 기준시간(60*1000 == 1분)
    max: 10,                // 허용횟수
    handler(req, res){      // 제한시간 초과시 콜백 함수
        res.status(this.statusCode).json({
            code: this.statusCode,  // 기본값 429
            message: '1분에 한번만 요청 가능합니다.',
        });
    },
});

// ⭐️ 새로운 버전 ---------------------------------------------
exports.deprecated = (req, res) =>{
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
    })
}

// ⭐️ 일치하는 호스트인지 확인 -----------------------------------
exports.corsWhenDomainMatches = async (req, res, next) => {
    
    console.log('-----------------------------------------');
    console.log('api middlewares/index.js corsWhenDomainMatches')
    console.log(req.body);
    console.log(req.body.clientSecret);
    console.log(req.get('origin'));
    console.log('-----------------------------------------');

    const domain = await Domain.findOne({
        where: {host: new URL(req.get('origin')).host}
    })

    if(domain){
        cors({
            origin: req.get('origin'),
            credentials: true,
        })(req, res, next);
    
    }else{
        next();
    }
}