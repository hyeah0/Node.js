const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할 지 적어줍니다.
  res.write('<h1>hi</h1>')
  res.end('<p>pp</p>')
})

  .listen(8080, ()=>{
    console.log()
  });
