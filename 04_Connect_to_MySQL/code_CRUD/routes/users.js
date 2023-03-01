const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../models/index"); 

const router = express.Router();

/*
    get     /               user 전체 보기
    post    /               user 추가
    get     /:id/comments   id별 comments만 따로 보기
*/
router.route('/')
    .get(async(req, res, next)=>{
        console.log('[ ---------- /user get 실행  ---------- ]');
        try{
            // 시퀄라이즈 쿼리
            //const users = await User.findAll();
            const sql = `select * from users`; 
            const users = await sequelize.query(sql, { type: QueryTypes.SELECT }); 
            
            res.json(users);

        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next)=>{
        console.log('[ ---------- /user post 실행 ---------- ]');
        console.log(req.body);

        try{
            // const user = await User.create({
            //     name: req.body.name,
            //     age: req.body.age,
            //     married: req.body.married,
            // });

            let name = req.body.name;
            let age = parseInt(req.body.age);
            let married = req.body.married;
        
            const sql = `insert into users values (DEFAULT, ?, ?, ?, '', DEFAULT)`; 
            const user = await sequelize.query(sql, { 
                type: QueryTypes.INSERT ,
                replacements: [name, age, married],
            }); 
            res.status(201).json(user);

        }catch(err){
            console.error(err);
            next(err);
        }
    });

router.get('/:id/comments', async(req, res, next)=>{
    console.log('[ ---------- /user/:id/comments get 실행 ---------- ]');

    try{
        // const comments = await Comment.findAll({
        //     include:{
        //         model: User,
        //         where: {id: req.params.id},
        //     },
        // });

        const sql = `select u.id, u.name, u.age, u.married, u.created_at, c.comment, c.id as cmtCreatedId
                       from users u 
                       join comments c 
                         on u.id = c.commenter 
                      where u.id = ?`; 
        const comments = await sequelize.query(sql, { 
            type: QueryTypes.SELECT ,
            replacements: [req.params.id],
        }); 

        console.log(comments);
        res.json(comments);
    }catch(err){
        console.error(err);
    }
});



module.exports = router;