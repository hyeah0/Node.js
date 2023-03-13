const User = require('../models/user');

exports.follow = async (req, res, next) => {
    try{
        console.log('* -------------------------------------------- *');
        console.log('  controllers.user.js');
        console.log('* -------------------------------------------- *');

        // 현재 로그인 되어있는 사용자 정보
        const user = await User.findOne({ where: {id: req.user.id}});

        if(user){
            // req.params.id == 팔로우한 아이디
            await user.addFollowing(parseInt(req.params.id, 10));
            // parseInt(string, radix) : 첫 번째 인자를 지정한 radix 진수로 표현한 정수를 반환합니다.
            // parseInt(req.params.id, 10) : req.params.id를 10진수로 표현 
            // radix가 10인 경우 10진수, 8인 경우는 8진수, 16인 경우 16진수로 변환

            res.send('팔로우 성공')
        
        }else{
            res.status(404).send('no user');
        }

    }catch(err){
        console.error(err);
        next(err);
    }
};