// 팔로우
const express = require('express');

const {isLoggedIn} = require('../middlewares');
const { follow , defollow } = require('../controllers/user');

const router = express.Router();

/* ----------------------------------------
    POST      /user/:id/follow       팔로우
    DELETE    /user/:id/defollow     팔로우취소
 ------------------------------------------ */       
router.post('/:id/follow', isLoggedIn, follow);
router.delete('/:id/defollow', isLoggedIn, defollow);

module.exports = router;