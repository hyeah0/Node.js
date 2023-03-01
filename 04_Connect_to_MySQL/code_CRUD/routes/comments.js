const express = require('express');
const { Comment } = require('../models');

const { QueryTypes } = require("sequelize"); 
const { sequelize } = require("../models/index"); 

const router = express.Router();

/*
    post    /               댓글 등록
    patch   /:id            댓글 일부만 수정
    delete  /:id            댓글 삭제
*/
router.post('/', async (req, res, next) => {
        console.log('[ ---------- /comments post 실행  ---------- ]');

        try{
            // const comment = await Comment.create({
            //     commenter: req.body.id,
            //     comment: req.body.comment,
            // })

            let commenter = parseInt(req.body.id);
            let comment = req.body.comment;
            console.log(`${commenter} : ${comment}`);

            const sql = 'insert into comments values (DEFAULT, ?, ?, DEFAULT)';
            const inputComment = await sequelize.query(sql, {
                type: QueryTypes.INSERT,
                replacements: [commenter, comment],
            })

            console.log(inputComment);
            res.status(201).json(inputComment);

        }catch(err){
            console.error(err);
            next(err);
        }
    });

// 댓글 수정
router.route('/:id')
    .patch(async (req, res, next)=>{
        console.log('[ ---------- /comments:id 코멘트 수정 ---------- ]');

        try{
            console.log(`${req.params.id} : ${ req.body.comment}`)
            // const updateComment = await Comment.update({
            //     comment: req.body.comment,
            // },{
            //     where: {id : req.params.id},
            // });

            let newComment = req.body.comment;
            let id = req.params.id;
            const sql = `update comments set comment = ? where id = ?`
            const updateComment = await sequelize.query(sql,{
                type: QueryTypes.UPDATE,
                replacements: [newComment, id],
            })

            res.json(updateComment);

        }catch(err){
            console.error(err);
            next(err);
        }
    })

    // 댓글 삭제
    .delete(async (req, res, next)=>{
        console.log('[ ---------- /comments:id 코멘트 삭제 ---------- ]');
        try{
            // const deleteComment = await Comment.destroy({
            //     where: {id: req.params.id}
            // });
            const sql = `delete from comments where id = ${req.params.id}`;
            const deleteComment = await sequelize.query(sql,{
                type: QueryTypes.DELETE,
            });

            res.json(deleteComment);

        }catch(err){
            console.error(err);
            next(err);
        }
    });


module.exports = router;