const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

dotenv.config();
const app = express();
app.set('port', process.env.PORT||3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

/* ------------------------------- 
   업로드 파일 폴더 생성
 --------------------------------- */
try{
    fs.readdirSync('uploads');

}catch(error){
    console.log('uploads 폴더가 없어 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

/* ------------------------------- 
   multer 설정
 --------------------------------- */
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },

        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext)+Date.now()+ext);
        },
    }),
    limits: {fileSize: 5 *1024*1024},
});

// get      /                   html파일
// get      /upload             html파일
// post     /upload/single      파일 한개 업로드
// post     /upload/array       파일 여러개 업로드
// post     /upload/fields      파일 여러개 업로드(input 여러개)
// post     /upload/none        파일 업로드 x


app.get('/upload', (req, res, next)=>{
    console.log('get /요청에서만 실행 됩니다.')
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload/single', upload.single('image'), (req, res)=>{
    console.log(req.file, req.body);
    res.send('ok');
});

app.get('/', (req, res, next)=>{
    console.log('get /요청에서만 실행 됩니다.')
    next();
    
},(req, res)=>{
    throw new Error('에러처리 미들웨어로 이동합니다.')
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '에서 대기중입니다.');
});


