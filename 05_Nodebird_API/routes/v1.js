const express= require('express');
const{ verifyToken } = require('../middlewares');     // 토큰 내용이 저장된 값
const{ createToken, tokenTest } = require('../controllers/v1');

const router = express.Router();

/*
    POST    /v1/token
    GET     /v1/test
*/
router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest);

module.exports = router;