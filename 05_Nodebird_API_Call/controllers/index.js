const axios = require('axios');

exports.test = async (req, res, next) => {  // 토큰 테스트 라우터
    try{
        // 세션에 토큰이 없으면 토큰 발급
        if(!req.session.jwt){

            console.log('세션에 토큰이 없습니다.');
            console.log('토큰을 새로 발급받습니다.');
            // 토큰 생성
            const tokenResult = await axios.post('http://localhost:8002/v1/token', {
                clientSecret: process.env.CLIENT_SECRET,
            });

            // 세션에 토큰 저장
            if(tokenResult.data?.code === 200){  // tokenResult.data && tokenResult.data.code 토큰 발급 성공
                req.session.jwt = tokenResult.data.token;

            }else{
                return res.json(tokenResult.data);  // 토큰 발급 실패 사유 응답
            }
        }

        // 발급받은 토큰 테스트
        const result = await axios.get('http://localhost:8002/v1/test',{
        headers: { authorization : req.session.jwt },
        });

        return res.json(result.data);

    }catch(err){
    console.error(err);

    // 토큰 만료시
    if(err.response?.status === 419){   // err.response && err.response.status
        return res.json(err.response.data);
    }

    return next(err);
    }
}
