// 파일로 연결
// res.render('views 폴더의 파일명', {title: })
const {User, Post} = require('../models');

exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내 정보'});
}

exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원가입'});
}

exports.renderMain = async (req, res, next) => {
    try{
        /* select p.*, u.id, u.nick 
             from posts p 
             left outer join users u on p.userid = u.id
             order by p.createdAt desc 
        */
        const posts = await Post.findAll({
            include: {model: User, attributes: ['id','nick'],},
            order: [['createdAt', 'DESC']]        
        });

        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    
    }catch(err){
        console.error(err);
        next(err);
    }  
}