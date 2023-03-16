// 파일로 연결
// res.render('views 폴더의 파일명', {title: })
const {User, Post, Hashtag} = require('../models');
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내 정보'});
}

exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원가입'});
}

exports.renderMain = async (req, res, next) => {
    try{
     
        // const posts = await Post.findAll({
        //     include: {model: User, attributes: ['id','nick'],},
        //     order: [['createdAt', 'DESC']]        
        // });
      
        const sql = `select p.*
                          , date_format(p.createdAt, "%Y-%m-%d") as created
                          , date_format(p.updatedAt, "%Y-%m-%d") as updated 
                          , u.id as postUserId, u.nick as postUserNick 
                       from posts p 
                       left outer join users u on p.userid = u.id
                      order by p.createdAt desc`;
        const posts = await sequelize.query(sql, { type: QueryTypes.SELECT });

        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    
    }catch(err){
        console.error(err);
        next(err);
    }  
}

exports.renderHashtag = async (req, res, next) => {
    console.log('* -------------------------------------------- *');
    console.log('  controllers.page.js renderHashtag query⬇️');
    
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    } 
    console.log(query); //낄낄
    console.log('* -------------------------------------------- *');

    try{
        // select * from hashtag where title = query
        const hashtag = await Hashtag.findOne({ where: {title: query}});
        
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({include: [{model: User}]});
        }

        return res.render('main', {
            title: `${query} || NodeBird`,  
            twits: posts,
        });

    }catch(err){
        console.error(err);
        return next(err);
    }
}