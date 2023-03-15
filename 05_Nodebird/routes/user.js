// 팔로우
const express = require('express');

const {isLoggedIn} = require('../middlewares');
//const { follow } = require('../controllers/user');
const { follow , defollow } = require('../controllers/user');

const router = express.Router();

// Post     /user:id/follow         
router.post('/:id/follow', isLoggedIn, follow);
router.post('/:id/defollow', isLoggedIn, defollow);

module.exports = router;