const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middelwares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

/**
    POST    /join    
    POST    /login   
    GET     /logout  
 */

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

module.exports = router;