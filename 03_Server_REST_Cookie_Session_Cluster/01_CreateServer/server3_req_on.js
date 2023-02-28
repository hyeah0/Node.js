/**
  데이터 파싱하기
  request.on()에서 'data', 'end' 처럼 이벤트에 콜백함수가 붙은것은 모두 비동기로 처리된다.
    - 동기 : 하나가 끝나야 다음거를 실행
            A작업이 끝나야 B작업 실행
    - 비동기 : 요청을 보냈을 때 응답 상태와 상관없이 다음 동작을 수행 할 수 있다. 
             A작업이 시작하면 동시에 B작업이 실행된다. A작업은 결과값이 나오는대로 출력된다.
             비동기적 코드의 실행 결과는 동기적 코드가 전부 실행 되고나서 값을 반환한다.
  on 메서드 
  - req.on('event',()=>{})
  - 특정 event를 읽을 수 있다.
  - 인자로 'data'와 콜백함수를 넣어줌으로써 'data event'가 발생할 때마다 해당 함수를 수행한다.
  - on의 인자로 들어가는 콜백함수에서 데이터 chunk를 인자로 받아서, 만들어놓은 배열에 저장한다. 
  - request on 메서드에 인자 'end'와 콜백함수를 넣어서 data event 기능이 종료되면
    읽어온 데이터를 문자로 변경하고, 해당 문자 중 특정 인자 (여기서는 '=') 기준으로 파싱해준다.
    - buffer.concat('배열') : 배열안에 든 버퍼들을 하나로 합침
    - buffer.concat('배열').toString() : 배열 안에 든 하나의 버퍼를 문자열로 변경
 */
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    
    /* ---------------------------------------------------------------------------- 
      url이 / 로 끝날때 form을 나타낸다.
    ---------------------------------------------------------------------------- */
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="message">');
        res.write('<button type="submit">send</button>');
        res.write('</form>');
        return res.end();
    }

    /* ---------------------------------------------------------------------------- 
      url이 /message 로 끝날때
    ---------------------------------------------------------------------------- */
    if(url === '/message' && method === 'POST' ){

        res.statusCode = 302;
        res.setHeader('Location','/');

        // url 주소를 /로 변경하고 form에서 작성한 메세지 값은 새로운 파일에 저장한다.
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk); // <Buffer 6d 65 73 73 61 67 65 3d 61 61 61 61>
            body.push(chunk);
        });

        req.on('end',()=>{
            // body배열에 저장한 chunk를 다루기 위해 buffer 사용
            const parsedBody = Buffer.concat(body).toString();  
            console.log(parsedBody);  // message=aaaa

            const message = parsedBody.split('=')[1];
            fs.writeFileSync('server3_message.txt',message);
        });

        return res.end();
    }

    /* ---------------------------------------------------------------------------- 
      url이 / , /message로 끝나지 않을때
    ---------------------------------------------------------------------------- */
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>url: not /</h1>');
    res.end();

});

server.listen(8080, ()=>{
    console.log('8080')
})

