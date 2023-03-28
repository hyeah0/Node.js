const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderHashtag, renderIdPost } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];

    next();
})

/**
    GET /profile [views/profile.html]
    GET /join    [views/join.html]
    GET /        [views/main.html]
    GET /hashtag : 해시태그 검색 결과
    GET /:id/get : 특정 id 글 보기
 */
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag);
router.get('/:id/get', renderIdPost);

module.exports = router;