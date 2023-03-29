const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.API_CALL_URL;

/* -----------------------------------------------------------
    request
-------------------------------------------------------------- */
const request = async (req, api) => {
    try{

        console.log('-----------------------------------------');
        console.log('api-call controllers/index.js request');
        console.log(`api: ${api}`);
        console.log('-----------------------------------------');

        // 세션에 토큰이 없으면 토큰 발급
        if(!req.session.jwt){

            console.log('세션에 토큰이 없습니다.');
            console.log('토큰을 새로 발급받습니다.');
            
            // 토큰 생성
            // http://localhost:8002/v1/token
            const tokenResult = await axios.post(`${URL}/token`,{
                clientSecret: process.env.CLIENT_SECRET,
            });

            console.log(`tokenResult : ${tokenResult}`);
            req.session.jwt = tokenResult.data.token;
        }

        console.log('토큰이 있습니다.');
        console.log('https://localhost:8002/v1/posts/my 로 요청');
        
        // API 요청
        // axios.get(`https://localhost:8002/v1/posts/my`,{})
        return await axios.get(`${URL}${api}`,{
            headers: { authorization : req.session.jwt },
        });

    }catch(err){
        if (err.response?.status === 419) { // 토큰 만료시 토큰 재발급 받기
            delete req.session.jwt;
            return request(req, api);
        } // 419 외의 다른 에러면
            return err.response;
    }
}

/* -----------------------------------------------------------
    GET      /myposts
-------------------------------------------------------------- */
exports.getMyPosts = async (req, res, next)=>{
    try{
        console.log('-----------------------------------------');
        console.log('api-call controllers/index.js getMyPosts');
        console.log('-----------------------------------------');

        const result = await request(req, '/posts/my');
        res.json(result.data);

    }catch(err){
        console.error(err);
        next(err);
    }
}

/* -----------------------------------------------------------
    GET      /search/:hashtag
-------------------------------------------------------------- */
exports.searchByHashtag = async (req, res, next)=>{
    try{
        const result = await request(
            req, `/posts/hashtag/${encodeURLComponent(req.params.hashtag)}`,
        )
    }catch(err){
        if(err.code){
            console.error(err);
            next(err);
        }
    }
};


