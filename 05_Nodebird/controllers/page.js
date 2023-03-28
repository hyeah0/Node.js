// 파일로 연결
// res.render('views 폴더의 파일명', {title: })
const { User, Post, Hashtag } = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index');

/* ----------------------------------------
    GET     /profile  [views/profile.html]
------------------------------------------- */
exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내 정보'});
}

/* ----------------------------------------
    GET     /join    [views/join.html]
------------------------------------------- */
exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원가입'});
}

/* ----------------------------------------
    GET     /        [views/main.html]
------------------------------------------- */
exports.renderMain = async (req, res, next) => {
    try{
     
        // const posts = await Post.findAll({
        //     include: {model: User, attributes: ['id','nick'],},
        //     order: [['createdAt', 'DESC']]        
        // });
      
        const sql = `select p.*
                          , u.id as postUserId, u.nick as postUserNick 
                       from posts p 
                       join users u on p.userid = u.id
                      order by p.createdAt desc`;
    
        const posts = await sequelize.query(sql, { type: QueryTypes.SELECT });
        
        let i=0;
        posts.map(post=>{
            posts[i].createdAt = timestamp(post.createdAt);
            posts[i].updatedAt = timestamp(post.updatedAt);
            i++;
        })

        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    
    }catch(err){
        console.error(err);
        next(err);
    }  
}

/* ----------------------------------------
    GET     /hashtag : 해시태그 검색 결과
------------------------------------------- */
exports.renderHashtag = async (req, res, next) => {
    console.log('* -------------------------------------------- *');
    console.log('  controllers.page.js renderHashtag query⬇️');
    
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    } 
    console.log(query); //검색한 해시태그
    console.log('* -------------------------------------------- *');

    try{
        // select * from hashtag where title = query
        const hashtag = await Hashtag.findOne({ where: {title: query}});
        
        console.log('--------------hashtag--------------');
        console.log(hashtag);

        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({include: [{model: User}] });
        }
        console.log('--------------posts--------------');

        let i=0;
        posts.map(post=>{
            posts[i].dataValues.createdAt = timestamp(post.dataValues.createdAt);
            posts[i].dataValues.updatedAt = timestamp(post.dataValues.updatedAt);
            posts[i].postUserNick = post.dataValues.User.nick;
            posts[i].postUserId = post.dataValues.User.id;
            i++;
        })

        return res.render('main', {
            title: `${query} || NodeBird`,  
            twits: posts,
        });

    }catch(err){
        console.error(err);
        return next(err);
    }
}

/* ----------------------------------------
    GET     /:id/get : 특정 id 글 보기
------------------------------------------- */
exports.renderIdPost = async (req, res, next) => {
    try{
        console.log('* -------------------------------------------- *');
        console.log('  controllers.page.js renderIdPost');
        console.log(`클릭한 id : ${req.params.id}`);
        console.log('* -------------------------------------------- *');
        
        const sql = `select p.*
                          , u.id as postUserId, u.nick as postUserNick 
                       from posts p 
                       join users u on p.userid = u.id
                      where u.id = ${req.params.id}
                      order by p.createdAt desc;`;
    
        const posts = await sequelize.query(sql, { type: QueryTypes.SELECT });
        
        let i=0;
        posts.map(post=>{
            posts[i].createdAt = timestamp(post.createdAt);
            posts[i].updatedAt = timestamp(post.updatedAt);
            i++;
        })

        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });


    }catch(err){
        console.error(err);
        next(err);
    }
};


// today
function timestamp(date){
    return date.toISOString().replace('T', ' ').substring(0, 19);
}