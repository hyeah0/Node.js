const express = require('express');
//const User = require('../models/user');

const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../models/index"); 

const router = express.Router();

router.get('/',async(req, res, next)=>{
    console.log('---------------------------------------------------------');
    console.log('초기 화면')

    try{
        // const users = await User.findAll();
        const sql = `select * from users`; 
        const users = await sequelize.query(sql, { type: QueryTypes.SELECT }); 
        
        const sql2 = `select c.*, u.name
                        from comments c 
                        join users u 
                          on c.commenter = u.id 
                       order by c.id`; 
        const comments = await sequelize.query(sql2, { type: QueryTypes.SELECT }); 
        console.log(comments);

        res.render('sequelize',{users : users, comments : comments},  );

        console.log('---------------------------------------------------------');
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;