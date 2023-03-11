const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

/**
    POST    /join    
    POST    /login                  : 로컬 로그인
    GET     /auth/kakao             : 카카오 로그인(카카오 창 리다이렉트)
    GET     /auth/kakao/callback    : 카카오 로그인 성공 여부 결과를 받아 수행
    GET     /logout  
 */

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect: '/?loginError=카카오로그인 실패',

}),(req, res)=>{
    res.redirect('/'); // 로그인 성공시 [ / ]로 이동
});

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

module.exports = router;