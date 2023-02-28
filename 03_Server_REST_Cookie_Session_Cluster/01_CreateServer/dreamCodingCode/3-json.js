const http = require('http');

// 메모리에 데이터를 가지고 있다.
const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JS' },
  { name: 'Node' },
  { name: 'Frontend' },
];

const server = http.createServer((req, res) => {
  
  const url = req.url; // 사용자가 어떤 데이터를 원하는지?
  const method = req.method; // 어떻게
  
  if (url === '/courses') {
  
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(courses)); // JS 형식의 객체를 Json 형식으로 변환
  
    } else if (method === 'POST') {
      
      const body = [];
      
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });

      // 모든 데이터가 받아지면 실행
      req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr); // Json 형식의 문자열을 Js 객체로 변환
        courses.push(course);
        console.log(course);
        
        res.writeHead(201); // 201: 새로 만듬
        res.end();
      });
    }
  }
});

server.listen(8080);
