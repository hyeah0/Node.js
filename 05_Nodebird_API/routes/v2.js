const express = require('express');
const cors = require('cors');
const{ verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');     // 토큰 내용이 저장된 값
const{ createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');

const router = express.Router();

router.use(cors({
    credentials: true
}));

router.use(corsWhenDomainMatches);

/*
    POST    /v2/token
    GET     /v2/test
    GET     /v2/posts/my
    GET     /v2/posts/hashtag/:title
*/
router.post('/token', apiLimiter, createToken);
router.get('/test', apiLimiter, verifyToken, tokenTest);
router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);
router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;