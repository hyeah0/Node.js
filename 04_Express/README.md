## Express 로 서버 만들기

```
const express = require('express')
const app = express()

//app.[get]('Url/Path',callback(request, response,

// Read
app.get('/posts',function(request, response, next){
    response.send(...)
})

// Create
app.post('/posts',function(request,response,next){
    response.send(...)
})

// Update
app.put('/posts',function(request,response,next){
    response.send(...)
})

// Delete
app.delete('/posts',function(request,response,next){
    response.send(...)
})

app.all('/posts',function(request, response, next){
    response.send(...)
})

app.use('/posts',function(request, response, next){
    response.send(...)
})

app.listen(8080)
```
