console.log('---------------------------------------------');
console.log('routes index.js');
console.log('---------------------------------------------');

const express = require('express');
const{ renderLogin, createDomain } = require('../controllers/index');
const{ isLoggedIn } = require('../middlewares');

const router = express.Router();

router.get('/', renderLogin);
router.post('/domain', isLoggedIn, createDomain);

module.exports = router;