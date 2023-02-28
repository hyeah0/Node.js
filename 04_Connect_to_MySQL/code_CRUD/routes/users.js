const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../models/index"); 

const router = express.Router();

/*
    get     /       user 전체 보기
    post    /       user 추가
*/
router.route('/')
    .get(async(req, res, next)=>{
        console.log('/ get 실행');
        try{
            //const users = await User.findAll();
            const query = `select * from users`; 
            const users = await sequelize.query(query, { type: QueryTypes.SELECT }); 
            
            res.json(users);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next)=>{
        console.log('/ post 실행');
        console.log(req.body);

        try{
            // const user = await User.create({
            //     name: req.body.name,
            //     age: req.body.age,
            //     married: req.body.married,
            // });

            let name = req.body.name;
            let age = parseInt(req.body.age);
            let married = req.body.married === 'on' ? 1 : 0;
        
            const query = `insert into users values (DEFAULT, ?, ?, ?, '', DEFAULT)`; 
            const user = await sequelize.query(query, { 
                type: QueryTypes.INSERT ,
                replacements: [name, age, married],
            }); 

            console.log('/ post user');
            console.log(user);
            res.status(201).json(user);
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;