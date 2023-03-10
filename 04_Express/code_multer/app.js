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
            console.log(`multer 설정, 파일 destination : ${req.url} `);
            
            done(null, 'uploads/');
        },

        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext)+Date.now()+ext);
        },
    }),
    limits: {fileSize: 5 *1024*1024},
});

// get      /                   
// get      /upload             html파일
// post     /upload/single      파일 한개 업로드
// post     /upload/array       파일 여러개 업로드
// post     /upload/fields      파일 여러개 업로드(input 여러개)
// post     /upload/none        파일 업로드 x
app.get('/upload', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

// 파일 하나 업로드
app.post('/upload/single', upload.single('image'), (req, res)=>{
    console.log('-- upload single ----------------');
    console.log(req.file, req.body);
    res.send(`<h1>ok</h2><hr><button onclick="location.href='./'">업로드 페이지로 이동</button>`);
});

// 파일 여러개 업로드
app.post('/upload/array', upload.array('many'), (req, res)=>{
    console.log('-- upload array ----------------');
    console.log(req.files, req.body);
    res.send(`<h1>ok</h2><hr><button onclick="location.href='./'">업로드 페이지로 이동</button>`);
})

// 파일 여러개 업로드(input 여러개)
app.post('/upload/fields', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res)=>{
    console.log('-- upload fields ----------------');
    console.log(req.files, req.body);
    res.send(`<h1>ok</h2><hr><button onclick="location.href='./'">업로드 페이지로 이동</button>`);
})

// 파일 업로드 x
app.post('/upload/none', upload.none(), (req, res)=>{
    console.log('-- upload none ----------------');
    console.log(req.body);
    res.send(`<h1>ok</h2><hr><button onclick="location.href='./'">업로드 페이지로 이동</button>`);
})

app.get('/', (req, res, next)=>{
    res.send(`<button onclick="location.href='./'">업로드 페이지로 이동</button>`);
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


