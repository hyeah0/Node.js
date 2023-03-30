const express = require('express');
const{ verifyToken, deprecated } = require('../middlewares');     // 토큰 내용이 저장된 값
const{ createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();
router.use(deprecated);
/*
    POST    /v1/token
    GET     /v1/test
    GET     /v1/posts/my
    GET     /v1/posts/hashtag/:title
*/
router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest);
router.get('/posts/my', verifyToken, getMyPosts);
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;