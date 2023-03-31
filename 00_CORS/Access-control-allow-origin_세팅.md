# 서버에서 Access-Control-Allow-Origin 헤더 세팅하기

0. CORS에 연관된 HTTP 헤더 종류
1. Node.js
   - express
2. JSP/Servlet
3. 스프링
4. tomcat

<hr>

## 0. CORS에 연관된 HTTP 헤더 종류

- 모두 설정할 필요는 없다.

    <table>
        <tr>
            <th>헤더</th>
            <th>예시</th>
            <th>설명</th>
        </tr>
        <tr>
            <td> <b>Access-Control-Allow-Origin</b> </td>
            <td> : https://naver.com </td>
            <td> 헤더에 작성된 출처만 브라우저가 리소스를 접근할 수 있도록 허용 </td>
        </tr>
        <tr>
            <td> <b>Access-Control-Request-Methods</b>  </td>
            <td> : GET, POST, PUT, DELETE </td>
            <td> 리소스 접근을 허용하는 HTTP 메서드를 지정해 주는 헤더 </td>
        </tr>
        <tr>
            <td> <b>Access-Control-Allow-Headers</b>  </td>
            <td> : Origin,Accept,X-Requested-With,Content-Type
            <br> , Access-Control-Request-Method
            <br> , Access-Control-Request-Headers,Authorization </td>
            <td> 요청을 허용하는 해더 </td>
        </tr>
        <tr>
            <td> <b>Access-Control-Max-Age</b> </td>
            <td> : 60  </td>
            <td> 클라이언트에서 preflight(예비요청) 의 요청 결과를 저장할 기간을 지정
            <br> 60초 동안 preflight 요청을 <b>캐시하는 설정</b>으로,
            <br> 첫 요청 이후 <b>60초 동안은 OPTIONS 메소드를 사용하는 예비 요청을 보내지 않는다.</b></td>
        </tr>
        <tr>
            <td> <b>Access-Control-Allow-Credentials</b>  </td>
            <td> : true </td>
            <td> 클라이언트 요청이 쿠키를 통해서 자격 증명을 해야 하는 경우에 true. 
            <br> --> 인증된 요청 (Credentialed Request)
            <br> <b>credentials</b> 옵션이 <b>include</b> 이어야한다.
            <br> </td>
        </tr>
        <tr>
            <td> <b>Access-Control-Expose-Headers</b>  </td>
            <td> : Content-Length </td>
            <td> 기본적으로 브라우저에게 노출이 되지 않지만, 
            <br> 브라우저 측에서 접근할 수 있게 허용해주는 헤더를 지정 </td>
        </tr>
    </table>

## 1. Node.js

- 서버에 response(응답) Header(헤더) 값으로 Access-Control 설정

    <details>
        <summary> 
            🐸 header 설정 
        </summary>

  ```
  let http = require('http');
  const PORT = process.env.PORT || 3000;  // 포트 번호 설정

  let httpServer = http.createServer(function (request, response) {

      /* 👉 Setting up Headers ---------------------------------------------------------------------- */

      // ⭐️ 허용 출처 url - * == 모든 출처(orogin)을 허용
      response.setHeader('Access-Control-Allow-origin', '*');
        // 👍 허용출처는 가급적 명시해 주는 것을 추천
        response.setHeader('Access-Control-Allow-origin', 'https://naver.com');

      // ⭐️ 허용 HTTP 메서드 - 모든 HTTP 메서드 허용
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // ⭐️ 허용 쿠키 주고받기 - 클라이언트와 서버 간에 쿠키 주고받기 허용
      response.setHeader('Access-Control-Allow-Credentials', 'true');

      /* -------------------------------------------------------------------------------------------- */

      // ...

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('ok');
  });

  httpServer.listen(PORT, () => {
      console.log('Server is running at port 3000...');
  });
  ```

    </details>

  ### 1. express 세팅

  1. cors 모듈 설치
     ```
     npm i cors
     ```
  2. <details>
         <summary>
             🐸 express cors 설정
         </summary>

     ```
     const express = require('express')
     const cors = require("cors"); // cors 설정을 편안하게 하는 패키지
     const app = express();

     // ...

     app.use(cors({
         origin: "https://naver.com",   // 접근 권한을 부여하는 도메인(출처)
         credentials: true,             // 응답 헤더에 Access-Control-Allow-Credentials 추가
         optionsSuccessStatus: 200,     // 응답 상태 200으로 설정
     }));
     ```

     </details>

  - [추가 참고 블로그(Inpa Dev)- 노드에서 cors 간편설정](https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-CORS-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-cors-%EB%AA%A8%EB%93%88)

## 2. JSP/Servlet

<details>
    <summary>🐸 코드</summary>

```
import javax.servlet.*;

public class CORSInterceptor implements Filter {

    // 허용할 출처들
    private static final String[] allowedOrigins = {
            "http://localhost:3000", "http://localhost:5500", "http://localhost:5501",
            "http://127.0.0.1:3000", "http://127.0.0.1:5500", "http://127.0.0.1:5501"
    };

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        String requestOrigin = request.getHeader("Origin");
        if(isAllowedOrigin(requestOrigin)) {
            // Authorize the origin, all headers, and all methods
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", requestOrigin);
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "*");
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods",
                    "GET, OPTIONS, HEAD, PUT, POST, DELETE");

            HttpServletResponse resp = (HttpServletResponse) servletResponse;

            // CORS handshake (pre-flight request)
            if (request.getMethod().equals("OPTIONS")) {
                resp.setStatus(HttpServletResponse.SC_ACCEPTED);
                return;
            }
        }
        // pass the request along the filter chain
        filterChain.doFilter(request, servletResponse);
    }

    private boolean isAllowedOrigin(String origin){
        for (String allowedOrigin : allowedOrigins) {
            if(origin.equals(allowedOrigin)) return true;
        }
        return false;
    }
}
```

</details>

## 3. 스프링

<details>
    <summary>🐸 전역 cors 설정</summary>

```
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        	.allowedOrigins("http://localhost:8080", "http://localhost:8081") // 허용할 출처
            .allowedMethods("GET", "POST")                                    // 허용할 HTTP method
            .allowCredentials(true)                                           // 쿠키 인증 요청 허용
            .maxAge(3000)                                                     // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }
}
```

</details>

<details>
    <summary>🐸 특정 컨트롤러에만 cors 설정</summary>

```
@Controller
@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class customController {

	// 특정 메소드에만 CORS 적용 가능
    @GetMapping("/url")
    @CrossOrigin(origins = "*", methods = RequestMethod.GET)
    @ResponseBody
    public List<Object> findAll(){
        return service.getAll();
    }
}
```

</details>

## 4. tomcat

- 톰캣 폴더 경로의 <b>conf/web.xml</b> 또는
  <br> webapps 내의 프로젝트 폴더 내 <b>WEB-INF/web.xml</b> 파일에 아래 헤더 설정을 추가

    <details>
        <summary>🐸 코드</summary>

  0.cors에 관련된 헤더 종류를 참고(글 상단) >> param-name , param-value

  ```
  <filter>
      <filter-name>CorsFilter</filter-name>
      <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
      <init-param>
          <param-name>cors.allowed.origins</param-name>
          <param-value>*</param-value>
      </init-param>
      <init-param>
          <param-name>cors.allowed.methods</param-name>
          <param-value>GET,POST,HEAD,OPTIONS,PUT,DELETE</param-value>
      </init-param>
      <init-param>
          <param-name>cors.allowed.headers</param-name>
          <param-value>Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers</param-value>
      </init-param>
      <init-param>
          <param-name>cors.exposed.headers</param-name>
          <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials</param-value>
      </init-param>
      <init-param>
          <!-- 쿠키 통신을 안하는데 이걸 true로 하면 4XX 서버 에러가 뜬다 -->
          <param-name>cors.support.credentials</param-name>
          <param-value>false</param-value>
      </init-param>
      <init-param>
          <param-name>cors.preflight.maxage</param-name>
          <param-value>10</param-value>
      </init-param>
  </filter>
  <filter-mapping>
      <filter-name>CorsFilter</filter-name>
      <url-pattern>/*</url-pattern>
  </filter-mapping>
  ```

    </details>
