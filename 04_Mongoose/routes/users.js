const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

/* -----------------------------------------------------------------------
    Get     /users/
    Post    /users/               name, age, married
    Get     /users/id/comments   
/* ----------------------------------------------------------------------- */
router.route('/')
      .get(async (req, res, next)=>{
        try{
            const users = await User.find({});
            res.json(users);

        }catch(err){
            console.error(err);
            next(err);
        }
      })
      .post(async (req, res, next)=>{
        try{
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });

            console.log('등록한 유저');
            console.log(user);

            res.status(201).json(user);
        
        }catch(err){
            console.error(err);
            next(err);
        }
      });

router.get('/:id/comments', async (req, res, next)=>{
    try{
        console.log('routes/users.js');

        // sql : select * 
        //         from Comment c
        //         join User u 
        //           on c.objectId = u._id
        //        where commenter = req.params.id  
        const comments = await Comment.find({commenter: req.params.id}).populate('commenter');

        console.log(`${req.params.id} 가 작성한 코멘트들`);
        console.log(comments);

        res.json(comments);

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;
