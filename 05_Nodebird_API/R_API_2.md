# API 서버 만들기 02

- [API 01]() : 로그인한 사용자 정보 조회 가능
  - [API 01 사용]()
- API 02 : 내가 올린 포스트와 해시태그 검색 결과 확인 가능
  - [API 02 사용]()

## 1. routes, controllers 코드 추가

- ⬇️ nodebird-api/routes/v1.js

  ```
  ...
  const{ ..., ..., getMyPosts, getPostsByHashtag } = require('../controllers/v1');

  ...
  /*
      GET     /v1/posts/my
      GET     /v1/posts/hashtag/:title
  */
  router.get('/posts/my', verifyToken, getMyPosts);
  router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

  module.exports = router;
  ```

- ⬇️ nodebird-api/controllers/v1.js

  ```
  const{ ..., ..., Post, Hashtag } = require('../models');
  ...
  exports.tokenTest = ...

  /* -----------------------------------------------------------
    GET     /v1/posts/my
  -------------------------------------------------------------- */
  exports.getMyPosts = (req, res) =>{

    // select * from post where userId = ${res.locals.decoded.id}
    Post.findAll({where: {userId : res.locals.decoded.id }})
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


  ```
