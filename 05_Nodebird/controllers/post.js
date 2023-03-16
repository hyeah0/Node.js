const { Post, Hashtag } = require('../models');
const { QueryTypes, DATE } = require("sequelize");
const { sequelize } = require("../models/index");


/* ----------------------------------------
    POST    /post/img   파일 업로드
 ------------------------------------------ */
exports.afterUploadImage = (req, res) => {
    console.log('* -------------------------------------------- *');
    console.log('  controllers.post.js afterUploadImage');
    console.log('* -------------------------------------------- *');
    console.log(req.file);
    res.json({url : `/img/${req.file.filename}`});
}

/* ----------------------------------------
    POST    /post       글 작성
 ------------------------------------------ */
exports.uploadPost = async (req, res, next) => {
    try{
        console.log('* -------------------------------------------- *');
        console.log('  controllers.post.js uploadPost');
        console.log('* -------------------------------------------- *');
        // 포스트
        const post = await Post.create({
            content: req.body.content,  // main.html textarea
            img: req.body.url,
            UserId: req.user.id,
        });

        // 해시태그
        /**
            str.match(정규표현식)   : 정규표현식에 해당하는 문자 여부 찾기
            str.replace(정규표현식, '교체할문구') : 정규표현식에 해당하는 문자 교체
            str.search(정규표현식)  : 정규표현식에 해당하는 문자가 몇번째 index에 있는지 찾기
         */
        const hashtags = req.body.content.match(/#[^\s#]*/g);   // ① 작성된 해시태그를 정규 표현식으로 추출 (\s: 공백을 ^: 제외)

        if(hashtags){
            console.log('* -------------------------------------------- *');
            console.log('  controllers.post.js uploadPost 작성한 해시태그');
            console.log(hashtags);
            console.log('* -------------------------------------------- *');

            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({   // 특정 요소를 검색하거나, 존재하지 않으면 새로 생성
                        where: { title: tag.slice(1).toLowerCase() },   // ② 해시태그들 배열 첫번째, 소문자로 변경한 값이 있는지 확인
                    })
                }),
            );
            
            await post.addHashtag(result.map(rtag => rtag[0]));    // ③ [모델, boolean] 값에서 모델만 가져오기
        }

        res.redirect('/');
    
    }catch(error){
        console.error(error);
        next(error);
    }
};

/* ----------------------------------------
    PUT     /post/change     글 수정
 ------------------------------------------ */
exports.updatePost = async (req, res, next)=>{
    try{
        console.log('* -------------------------------------------- *');
        console.log('controllers.post.js updatePost 글 수정');
        console.log('* -------------------------------------------- *');

        // 1. 글 수정
        // 2. posthashtag 삭제후 hash태그 재등록

        // 업데이트 시간 변경 안됨..
        // const sql = `update posts 
        //                 set content = '${req.body.data.changeContent}',
        //                     img = '${req.body.data.changeImgUrl}'
        //               where id= ${req.body.data.postId} and UserId = ${req.body.data.postUserId}`;
        // const result = await sequelize.query(sql, {type: QueryTypes.UPDATE});

        Post.update(
            {/* -- 변경값 설정 ---------- */
                content: `${req.body.data.changeContent}`,
                img: `${req.body.data.changeImgUrl}`,
            },
            {/* -- 조건 --------------- */
                where: {id: `${req.body.data.postId}`, UserId: `${req.body.data.postUserId}`}
            }
        );

        // -- 해시태그

        res.send('글 수정 성공!');

    }catch(err){
        console.error(err);
        next(err);
    }
}

/* ----------------------------------------
    POST    /post/delete     글 삭제
 ------------------------------------------ */
 exports.deletePost = async (req, res, next) => {
    try{
        console.log('* -------------------------------------------- *');
        console.log('controllers.post.js deletePost 글 삭제');
        console.log(req.body);
        console.log('* -------------------------------------------- *');

        const sql = `delete from posts where id = ${req.body.postId} and UserId = ${req.body.postUserId}`;
        const result = await sequelize.query(sql, { type: QueryTypes.DELETE });
    
        res.send('글 삭제 성공!');
    }catch(err){
        console.error(err);
        next(err);
    }
    
}