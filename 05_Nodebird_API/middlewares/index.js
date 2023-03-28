const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) =>{
    
    // 로그인 유무 확인
    if(req.isAuthenticated()){
        next();
    }else{
        //res.status(403).send('로그인 필요');
        res.redirect('/');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태 입니다.');
        res.redirect(`/?error=${message}`);
    }
};

// jwt 토큰확인
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