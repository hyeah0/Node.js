const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/',async(req, res, next)=>{
    try{
        const users = await User.findAll();
        console.log('---------------------------------------------------------');
        console.log('routes/index.js')
        console.log(users);
        console.log('---------------------------------------------------------');
        res.render('sequelize', { users });

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;