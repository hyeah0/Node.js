const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middelwares');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
})

/**
    GET /profile [views/profile.html]
    GET /join    [views/join.html]
    GET /        [views/main.html]
 */
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;