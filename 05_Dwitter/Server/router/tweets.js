import express from 'express';
import 'express-async-errors';

let tweets = [
{
    usernum: '1',
    text: '와~~',
    createdAt: Date.now().toString(),
    usernick: 'pen',
    username: 'steve',
    url: 'https://cdn.pixabay.com/photo/2013/07/12/15/55/penguin-150563_1280.png'
},
{
    usernum: '1',
    text: '와~~2',
    createdAt: Date.now().toString(),
    usernick: 'pen',
    username: 'steve',
    url: 'https://cdn.pixabay.com/photo/2013/07/12/15/55/penguin-150563_1280.png'
},
{
    usernum: '2',
    text: '나는 다른 사람일세',
    createdAt: Date.now().toString(),
    usernick: 'man',
    username: 'iron',
    url: 'https://cdn.pixabay.com/photo/2013/07/13/11/49/iron-158742_1280.png'
},
];

const router = express.Router();
// 도메인 tweets으로 설정됨
// GET /tweets
// GET /tweets?usernick=:usernick
// GET /tweets/:usernum
// POST /tweets
// PUT /tweets/:usernum
// DELETE /tweets/:usernum

/* --------------------------------------------------------------------------------------- */
/*      글 가져오기                                                                         */
/* --------------------------------------------------------------------------------------- */
router.get('/', (req, res, next) => {
    
    // usernick이 동일한 tweets 배열에 있는 값만 가져오기
    // usernick 값이 없다면 전체 트윗글을 가져오기
    const userNick = req.query.usernick;

    const data = 
        userNick
        ? tweets.filter(tweet => tweet.usernick === userNick) 
        : tweets;
    res.status(200).json(data);
});

router.get('/:usernum', (req, res, next) => {
    // url에 사용자 고유번호가 넘어올때 해당 사용자 글만 가져오기
    const userNum = req.params.usernum;
    const userTweet = tweets.find(tweet => tweet.usernum === userNum);

    if(userTweet){
        res.status(200).json(tweets.filter(t=> t.usernum === userNum));
    }else{
        res.status(404).json({message: `Tweet id(${userNum}) not found`});
    }
});
  
/* --------------------------------------------------------------------------------------- */
/*      글 쓰기                                                                              */
/* --------------------------------------------------------------------------------------- */
router.post('/',(req, res, next) => {
    
    // body에서 가져온 요청 값 변수에 넣어주기
    const text = req.body.text;
    const userNick = req.body.usernick;
    const userName = req.body.username;
    // == const {text, usernick, username} = req.body; 

    const tweet = {
        usernum: Date.now().toString(),
        text,
        createdAt: new Date(),
        userNick,
        userName
    };

    // tweets 배열에 새로 작성된 글을 가장 앞에 넣는다. 
    tweets = [tweet, ...tweets];
    
    res.status(201).json(tweet)

});

/* --------------------------------------------------------------------------------------- */
/*      글 수정                                                                              */
/* --------------------------------------------------------------------------------------- */
router.put('/:usernum',(req, res, next) => {
    
    const userNum = req.params.usernum;
    const updateText = req.body.text;
    const updateTweet = tweets.find(tweet => tweet.usernum == userNum);
    
    if(updateTweet){
        updateTweet.text = updateText;
        res.status(200).json(updateTweet);
    }else{
        res.status(404);
    }
});

/* --------------------------------------------------------------------------------------- */
/*      글 삭제                                                                              */
/* --------------------------------------------------------------------------------------- */
router.delete('/:usernum',(req, res, next) => {
    const userNum = req.params.usernum;
    
    // 해당하는 usernum을 제외한 트윗글을 tweets 배열에 다시 넣는다.
    tweets = tweets.filter(tweet => tweet.usernum != userNum);

    res.sendStatus(204).json({message: `Tweet id(${userNum}) tweet delete`});
});


export default router;