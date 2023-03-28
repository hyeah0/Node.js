const { Post, Hashtag } = require('../models');
const { QueryTypes } = require("sequelize");
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
        
        let createDate = timestamp();

        // 포스트
        // const post = await Post.create({
        //     content: req.body.content,  // main.html textarea
        //     img: req.body.url,
        //     UserId: req.user.id,
        // });
        
        const sql = `insert into posts values(default, '${req.body.content}', '${req.body.url}', '${createDate}', '${createDate}', ${req.user.id});`;
        const post = await sequelize.query(sql, {type: QueryTypes.INSERT});

        console.log(post);
        console.log('----------------------------');

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
/*
    1. 글 수정
        2-1. 수정한 글에 해시태그가 있을 경우
            3. 기존 글과 수정한 글의 해시태그의 변화가 있을 경우

        2-2. 수정한 글에 해시태그가 없을 경우
*/
exports.updatePost = async (req, res, next)=>{
    try{

        console.log('* -------------------------------------------- *');
        console.log('controllers.post.js updatePost 글 수정');
        console.log('* -------------------------------------------- *');

        /* --------------------------------------------------------------
            1. 글 수정  
               글 수정시 post 값은 1로 나온다.
        ----------------------------------------------------------------- */
        let createDate = timestamp();
        
        // const post = await Post.update( 
        //     {/* -- 변경값 설정 ---------- */
        //         id: `${req.body.data.postId}`,
        //         content: `${req.body.data.changeContent}`,
        //         img: `${req.body.data.changeImgUrl}`,
        //     },
        //     {/* -- 조건 --------------- */
        //         where: {id: `${req.body.data.postId}`, UserId: `${req.body.data.postUserId}`}
        //     }
        // );
        const updatesql = `update posts 
                              set content = '${req.body.data.changeContent}'
                                , img = '${req.body.data.changeImgUrl}'
                                , updatedAt = '${createDate}'
                            where id = ${req.body.data.postId} and UserId = ${req.body.data.postUserId};`;
        const post = await sequelize.query(updatesql, {type: QueryTypes.UPDATE});
        
        // 화면으로 부터 작성된 글을 받아 해시태그만 추출
        const hashtags = req.body.data.changeContent.match(/#[^\s#]*/g);   // ① 재 작성된 해시태그를 정규 표현식으로 추출 (\s: 공백을 ^: 제외)
        const beforeHashtags = req.body.data.beforeContent.match(/#[^\s#]*/g);

        /* --------------------------------------------------------------
            2-1. 수정한 글에 해시태그가 있을 경우
        ----------------------------------------------------------------- */
        if(hashtags){   
            console.log('* -------------------------------------------- *');
            console.log('  controllers.post.js befor hashtag, 아래 after hashtag');
            console.log(beforeHashtags);    
            console.log(hashtags);
            console.log('* -------------------------------------------- *');

            // 작성된 글의 해시태그와 수정된 글의 해시태그 다른 경우 확인
            const addTag = hashtags.filter(hashtag => {
                if(beforeHashtags){
                    return ! beforeHashtags.some(beHashtag => beHashtag === hashtag );
                }
                return hashtag;
            });
            console.log('추가된 태그 ⬇️');
            console.log(addTag);

            /* --------------------------------------------------------------
                2-1. 기존 글과 수정한 글의 해시태그의 변화가 있을 경우
            ----------------------------------------------------------------- */
            if(addTag || hashtags.length() != beforeHashtags.length()){
                console.log('추가된 태그가 있거나, 태그의 변화가 있습니다.');
                
                // 글에 작성된 해시태그 정보 모두 가져오기(추가 해시태그는 테이블에 추가)
                const result = await Promise.all(
                    hashtags.map(tag => {
                        return Hashtag.findOrCreate({   
                            where: { title: tag.slice(1).toLowerCase() },  
                        })
                    }),
                );

                let writeHashtagId = [];         // 작성된 해시태그 아이디 전체
                let addHashTagId = [];           // 추가된 해시태그 아이디 전체
                result.map(rtag => {
                    writeHashtagId.push(rtag[0].dataValues.id);

                    // 추가된 해시태그가 있을 경우 실행
                    if(addTag){ 
                        addTag.forEach(e=>{
                            console.log(e.replace('#','').toLowerCase());
                            if(e.replace('#','').toLowerCase() === rtag[0].dataValues.title){
                                addHashTagId.push(rtag[0].dataValues.id);
                            } 

                        })
                    }
                });
            
                // 기존글에 있던 해시태그를 삭제했을 경우 삭제한 해시태그id PostHashtag 테이블에서 삭제
                const dPostHashSql = `delete from PostHashtag where PostId = ${req.body.data.postId} and HashtagId not in (${writeHashtagId});`;
                await sequelize.query(dPostHashSql, {type: QueryTypes.DELETE});
            
                // 추가되거나 변경된 hashTag가 있을 경우
                if(addHashTagId){
                    console.log('태그 변경');
                    let creupdate = timestamp();

                    addHashTagId.forEach(e=>{
                        console.log(e);
                    
                        const createPostHashSql = `insert into PostHashtag (createdAt, updatedAt, PostId, HashtagId) 
                                                                    values ('${creupdate}', '${creupdate}', ${req.body.data.postId}, ${e})`;
                        sequelize.query(createPostHashSql, {type: QueryTypes.INSERT})
                    })
                }
            }
            
        }else{ // 수정한 글에 해시태그가 없을 경우
            console.log('수정한 글에 해시태그가 없습니다.');
            const dPostHashSql = `delete from PostHashtag where PostId = ${req.body.data.postId};`;
            await sequelize.query(dPostHashSql, {type: QueryTypes.DELETE});
        }

        res.send('글 수정 성공!');

    }catch(err){
        console.error(err);
        next(err);
    }
}

// today
function timestamp(){
    let today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace('T', ' ').substring(0, 19);
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
    
};
