const express = require('express');
//const User = require('../models/user');

const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../models/index"); 

const router = express.Router();

router.get('/',async(req, res, next)=>{
    try{
        // const users = await User.findAll();
        const query = `select * from users`; 
        const users = await sequelize.query(query, { type: QueryTypes.SELECT }); 
        console.log('---------------------------------------------------------');
        console.log('routes/index.js')
        console.log('---------------------------------------------------------');
        res.render('sequelize', {users} );

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;