/* --------------------------------------------------------------------------------------
    1. 팔로워 하기 (/user/${userId}/follow)
    2. 팔로잉 취소 (/user/${userId}/defollow)
 ---------------------------------------------------------------------------------------- */
const User = require('../models/user');
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

/* --------------------------------------------------------------------------------------
    팔로워 하기
 ---------------------------------------------------------------------------------------- */
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

            res.send('팔로우 성공');
        
        }else{
            res.status(404).send('no user');
        }

    }catch(err){
        console.error(err);
        next(err);
    }
};

/* --------------------------------------------------------------------------------------
    팔로잉 취소하기
 ---------------------------------------------------------------------------------------- */
exports.defollow = async (req, res, next)=>{
    try{
        console.log('* -------------------------------------------- *');
        console.log('  controllers.user.js : 팔로잉취소');
        console.log(`req.params.id : ${req.params.id}`);
        console.log(`req.user.id : ${req.user.id}`);
        console.log('* -------------------------------------------- *');
        
        const sql = `delete from follow where followerid = ${req.user.id} and followingid = ${req.params.id}`;
        const result = await sequelize.query(sql, { type: QueryTypes.DELETE });

        res.send('언팔로우 성공');

    }catch(err){
        console.error(err);
        next(err);
    }
};