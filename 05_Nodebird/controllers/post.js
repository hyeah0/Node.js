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

        // -- 1. posthashtag 삭제
        // -- 2. 글 수정 
        // -- 3. hash태그 

        // 1. 글 수정
        const post = await Post.update(
            {/* -- 변경값 설정 ---------- */
                id: `${req.body.data.postId}`,
                content: `${req.body.data.changeContent}`,
                img: `${req.body.data.changeImgUrl}`,
            },
            {/* -- 조건 --------------- */
                where: {id: `${req.body.data.postId}`, UserId: `${req.body.data.postUserId}`}
            }
        );
 
        const hashtags = req.body.data.changeContent.match(/#[^\s#]*/g);   // ① 재 작성된 해시태그를 정규 표현식으로 추출 (\s: 공백을 ^: 제외)
        const beforeHashtags = req.body.data.beforeContent.match(/#[^\s#]*/g);

        if(hashtags){
            console.log('* -------------------------------------------- *');
            console.log('  controllers.post.js 글 수정시 작성한 해시태그 위 befor, 아래 after');
            console.log(beforeHashtags);
            console.log(hashtags);
            console.log('* -------------------------------------------- *');

            // 해시태그 저장
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({   // 특정 요소를 검색하거나, 존재하지 않으면 새로 생성
                        where: { title: tag.slice(1).toLowerCase() },   // ② 해시태그들 배열 첫번째, 소문자로 변경한 값이 있는지 확인
                    })
                }),
            );

            // console.log('--------------------------------');
            // console.log(result[0]);
            // console.log('--------------------------------');

            result.map(rtag => {
                console.log(rtag[0].dataValues.id);
                console.log(rtag[0].dataValues.title);
            });
            // posthashtag 저장
            // 1. 수정되지 않은 해시태그 >>> 유지
            // 2. 해시태그를 수정할 경우 >>> 수정 전 해시태그는 posthashtag 테이블에서 삭제, 새로 작성한 해시태그는 posthashtag 테이블에 추가 

            // 이미 있는 해시태그
            // const alreadyHashtag = hashtags.filter(hashtag => {
            //     return beforeHashtags.some(beHashtag => beHashtag === hashtag );
            //   });
            // console.log(alreadyHashtag);

            // let alreadyHashtagId = [];
            // result.map(rtag => {
            //     alreadyHashtagId.push(rtag[0].dataValues.id);
            // });

            // console.log(hashtagId);
            // console.log(hashtagId.toString());

            // // 해시태그를 수정할 경우 >>> 수정 전 해시태그는 posthashtag 테이블에서 삭제
            // const dPostHashSql = `delete from PostHashtag where PostId = ${req.body.data.postId} and HashtagId not in (${hashtagId})`;
            // await sequelize.query(dPostHashSql, {type: QueryTypes.DELETE});
            
            // const alreadyTagSql = `select HashtagId from PostHashtag where PostId = ${req.body.data.postId}`;
            // const alreadyTag = await sequelize.query(alreadyTagSql, {type: QueryTypes.SELECT});
            // console.log(alreadyTag);
            // console.log(alreadyTag.HashtagId);

            // // 수정되지 않은 해시태그 >>> 유지
            // result.map(rtag => {
            //     // 해시태그를 수정할 경우 >>> 새로 작성한 해시태그는 posthashtag 테이블에 추가 
            //     const createPostHashSql = `insert into PoshHashtag (createdAt,updatedAt,PostId,HashtagId) 
            //                                                 values (${rtag[0].dataValues.createdAt}, ${rtag[0].dataValues.updatedAt}
            //                                                        ,${req.body.data.postId}, ${rtag[0].dataValues.id})
            //                                                  where HashtagId not in (${alreadyTag[i]})`;
            //     sequelize.query(createPostHashSql, {type: QueryTypes.INSERT});                                          
            // });
            
        }



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

               // const postResult = sequelize.query(createPostHashSql, {type: QueryTypes.INSERT});
                
                // const selectSql = `select PostId, HashtagId from PostHashtag where PostId = ${req.body.data.postId} and HashtagId = ${hashtagId}`;
                // const result = sequelize.query(selectSql, { type: QueryTypes.DELETE });
                // const dPostHashSql = `delete from PostHashtag where PostId = ${req.body.data.postId}`;
                // const postResult = await sequelize.query(dPostHashSql, {type: QueryTypes.DELETE});

                // posthashtag 저장
                // INSERT INTO PostHashtag (createdAt,updatedAt,PostId,HashtagId) VALUES ('2023-03-17 06:43:00','2023-03-17 06:43:00',11,13),('2023-03-17 06:43:00','2023-03-17 06:43:00',11,14);
                
                //await post.addHashtag(result.map(rtag => rtag[0]));    // ③ [모델, boolean] 값에서 모델만 가져오기