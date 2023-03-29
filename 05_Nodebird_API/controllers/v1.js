const jwt = require('jsonwebtoken');
const{ Domain, User, Post, Hashtag } = require('../models');

/* -----------------------------------------------------------
    POST    /v1/token
-------------------------------------------------------------- */
exports.createToken = async (req, res)=>{
    console.log('-----------------------------------------');
    console.log('api controllers/v1.js createToken (v1/token)')
    console.log('-----------------------------------------');

    const { clientSecret } = req.body;
    try{

        // 도메인 정보
        /*
            select d.* , u.nick, u.id
                from domains d
                join users u
                on d.UserId = u.id
                where d.clientSecret = ${clientSecret}
        */

        const domain = await Domain.findOne({
            where: {clientSecret},
            include: {
                model: User,
                attribute: ['nick', 'id'],
            },
        });

        // 등록되지 않은 도메인일 경우
        if(!domain){
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 도메인 먼저 등록해주세요',
            });
        }

        // 토큰 발급
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick,
        },process.env.JWT_SECRET,
        {
            expiresIn: '1m',     // 유효기간 1분
            issuer: 'nodebird',  // 발급자
        });

        // return 값
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버에러',
        });
    }
};

/* -----------------------------------------------------------
    GET     /v1/test
-------------------------------------------------------------- */
exports.tokenTest = (req, res)=>{
    res.json(res.locals.decoded);
};

/* -----------------------------------------------------------
    GET     /v1/posts/my
-------------------------------------------------------------- */
exports.getMyPosts = (req, res) =>{

    console.log('-----------------------------------------');
    console.log('api controllers/v1.js getMyPosts (/v1/posts/my)')
    console.log('-----------------------------------------');

    // select * from post where userId = ${res.locals.decoded.id}
    Post.findAll({where: { userId : res.locals.decoded.id }})
        .then((posts)=>{

            // posts == 특정 userid의 글 모두
            console.log(posts);

            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((err)=>{
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: '서버에러',
            });
        });
};

/* -----------------------------------------------------------
GET     /v1/posts/hashtag/:title
-------------------------------------------------------------- */
exports.getPostsByHashtag = async (req, res)=>{
    try{
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title }});

        if(!hashtag){
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다.',
            })
        }

        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버에러',
        });
    }
};