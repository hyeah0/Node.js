# API 사용하기 02

- [API 01](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_1.md) : 로그인한 사용자 정보 조회 가능
  - [API 01 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_1_call.md)
- [API 02](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API/R_API_2.md) : 내가 올린 포스트와 해시태그 검색 결과 확인 가능
  - [API 02 사용](https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/R_API_2_call.md)

# 화면

<div>
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/get_Post.png" width="45%">
</div>
<div>
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/search_Hashtag_01.png" width="45%">
<img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/search_Hashtag_02.png" width="45%">
</div>

## 1. routes, controllers 추가

- ⬇️ Nodebird_API_Call/routes/index.js

  ```
  const{ getMyPosts, searchByHashtag } = require('../controllers');
  ...
  /*
      GET      /myposts
      GET      /search/:hashtag
  */
  router.get('/myposts', getMyPosts);
  router.get('/search/:hashtag', searchByHashtag);

  ```

- ⬇️ Nodebird_API_Call/.env

  ```
  ...
  API_URL=http://localhost:8002/v1
  API_CALL_URL=http://localhost:4000
  ```

- ⬇️ Nodebird_API_Call/controllers/index.js

  ```
  const axios = require('axios');

  const URL = process.env.API_URL;
  axios.defaults.headers.origin = process.env.API_CALL_URL;

  // 수정 코드 ⬇
  /* -----------------------------------------------------------
      POST     /test
  -------------------------------------------------------------- */
  // 👉 수정전
  // exports.test = async (req, res, next) => {  // 토큰 테스트 라우터
  // 👉 수정후
  const request = async (req, api) => {
      try{
          // 세션에 토큰이 없으면 토큰 발급
          if(!req.session.jwt){

              console.log('세션에 토큰이 없습니다.');
              console.log('토큰을 새로 발급받습니다.');
              // 토큰 생성
              // 👉 수정전
              // const tokenResult = await axios.post('http://localhost:8002/v1/token', {
              //     clientSecret: process.env.CLIENT_SECRET,
              // });

              // 👉 수정후
              const tokenResult = await axios.post(`${URL}/token`, {
                  clientSecret: process.env.CLIENT_SECRET,
              });

              // 세션에 토큰 저장
              // 👉 수정전
              if(tokenResult.data?.code === 200){  // tokenResult.data && tokenResult.data.code 토큰 발급 성공
                  req.session.jwt = tokenResult.data.token;

              }else{
                  return res.json(tokenResult.data);  // 토큰 발급 실패 사유 응답
              }

              // 👉 수정후
              req.session.jwt = tokenResult.data.token;

          }

          // 👉 수정전
          // 발급받은 토큰 테스트(https://localhost:8002/v1/test >>> 로그인 사용자 정보)
          const result = await axios.get(`${URL}/test`,{
              headers: { authorization : req.session.jwt },
          });
          return res.json(result.data);

          // 👉 수정후
          return await axios.get(`${URL}${api}`,{
              headers: { authorization : req.session.jwt },
          })

      }catch(err){

          // 토큰 만료시
          // 👉 수정전
          console.error(err);
          if(err.response?.status === 419){   // err.response == true >> err.response.status == 419 일때
              return res.json(err.response.data);
          }
          // 419외 다른 에러일때
          return next(err);

          // 👉 수정후
          if (error.response?.status === 419) { // 토큰 만료시 토큰 재발급 받기
              delete req.session.jwt;
              return request(req, api);
          } // 419 외의 다른 에러면
              return error.response;
      }
  };

  // 추가 코드 ⬇
  /* -----------------------------------------------------------
      GET      /myposts
  -------------------------------------------------------------- */
  exports.getMyPosts = async (req, res, next)=>{
      try{
          console.log('-----------------------------------------');
          console.log('api-call controllers/index.js getMyPosts');
          console.log('req⬇');
          console.log(req);
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
  ```
