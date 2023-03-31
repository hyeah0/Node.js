# CORS

- [CORS 참고](https://github.com/hyeah0/Node.js/tree/main/00_CORS)

## - api를 불러오는 프런트에서 api 서버를 호출할경우

- call : api를 불러오는 서버 (localhost:4001)
- api : api 서버 (localhost:8002)

  ### 1. Nodebird_API_Call routes, controllers 추가

  - ⬇️ Nodebird_API_Call/routes/index.js

    <pre>
    ...
    const{ searchByHashtag, ..., <b>renderMain</b> } = require('../controllers');
    ...
    router.get('/', renderMain);
    ...
    </pre>

  - ⬇️ Nodebird_API_Call/controllers/index.js
    <pre>
    ...
    exports.renderMain = (req, res) => {
        res.render('main', {key: process.env.CLIENT_SECRET})
    }
    </pre>

    ### 2. Nodebird_API_Call views 프런트 화면

    - ⬇️ Nodebird_API_Call/views/main.html

      ```
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>프런트 API 요청</title>
      </head>
      <body>

          <div id="result"></div>

          <!-- 스크립트 -->
          <script src="https://unpkg.com/axios/dist/asios.min.js"></script>

          <script>
              axios.post('http://localhost:8002/v2/token',{ clientSecret: '{{key}}'})
                  .then((res)=>{ // res == 발급받은 토큰
                          document.querySelector('#result').textContent = JSON.stringify(res.data);
                      })
                  .catch((err)=>{console.error(err)});
          </script>

      </body>
      </html>
      ```

    ### ⭐️ cors 에러

    - origin 주소와 Access-Control-Allow-Origin 주소가 동일하지 않을 경우 에러
    - Access-Control-Allow-Origin 값이 헤더에 없을 경우

        <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_error.png" width="100%">

        <pre>
        Access to XMLHttpRequest at <b>'http: //localhost: 8002/V2/token'</b> from origin <b>'http: //localhost:4000'</b> has been <b>blocked by CORS policy</b>:
        Response to prefliaht reauest doesn't pass access control check: <b>No 'Access-Control-Allow-Oriain' header is present on the requested resource.</b>
        </pre>

    - 예비요청시에 HTTP 메서드를 GET, POST가 아닌 OPTIONS 메서드가 사용된다.

      <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_preflightRequestMethod.png" width="100%">

      - OPTIONS 메서드

        <div>
        <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_preflightRequestMethod_01.png" width="45%">
        <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_preflightRequestMethod_02.png" width="45%">
        <div>
        <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_browserToServerMethod.png" width="100%">

    ### 3. cors 패키지 설치 후 적용

    #### 1. cors 모듈 설치

    ```
    npm i cors
    ```

    #### 2. api 제공 routes/v2 에 적용

    - ⬇️ Nodebird_API/routes/v2.js

        <pre>
        const express = require('express')
        <b>const cors = require('cors')</b>
        ...
        const router = express.Router();
        <b>
        router.use(cors({
            credentials: true
        }));
        </b>
        </pre>

    - <pre>
      router.use(cors({
            <b>credentials</b>: true
      }));
      </pre>

      - credentials 옵션

        - true 일경우 도메인간의 쿠키가 공유된다.
        - 프런트와 서버의 도메인이 다른경우 이옵션을 활성화 하지 않을경우 로그인이 되지 않을 수 있다.

      - withCredentials 옵션
        - axios에서도 도메인이 다른데 쿠키를 공유해야할 경우 true 옵션값을 준다.

    ### ⭐️ 응답헤더

    <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_preflightRequestMethod_03.png" width="100%">

    - 응답헤더가
      <br>Access-Control-Allow-Origin 이 \*로 되어있다.
    - credentials: true 는
      <br> Access-Control-Allow-Credentials헤더를 true 로 만든다.

    #### - 문제점

    - 요청을 보내는 주체가 클라이언트라 비밀키가 모두에게 노출된다.
      - <small>비밀키(process.env.CLIENT_SECRET)</small>

    #### - 문제 해결

    <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_preflightRequestMethod_04.png" width="100%">

    - 비밀키 발급시 허용한 도메인을 적은후
      <br>호스트와 비밀키가 일치할때만 cors를 허용하게 수정

    - ⬇️ Nodebird_API/routes/v2.js
    <pre>
    const express = require('express');

    const{ verifyToken, apiLimiter, <b>corsWhenDomainMatches</b> } = require('../middlewares');

    ...
    const router = express.Router();

    <b>router.use(corsWhenDomainMatches);</b>
    </pre>

    - domain 테이블 참고 이미지

      <img src="https://github.com/hyeah0/Node.js/blob/main/05_Nodebird_API_Call/a_md_img/cors_domains_table_03.png" width="100%">

    - ⬇️ Nodebird_API/middlewares/index.js
    <pre>
    const rateLimit = require('express-rate-limit');
    <b>
    const cors = require('cors')
    const{ Domain } = require('../models');
    </b>
    ...
    <b>
    exports.corsWhenDomainMatches = async (req, res, next) => {
    
        const domain = await Domain.findOne({
            where: {host: new URL(req.get('origin').host)}
        })
    
        if(domain){
            cors({
                origin: req.get('origin'),
                credentials: true,
            })(req, res, next);
        
        }else{
            next();
        }
    }
    </b>
    </pre>
