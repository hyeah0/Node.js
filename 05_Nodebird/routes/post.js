/** 참고
 *  multer 패키지는 파일을 서버디스크에 저장
 *  단, 서버 문제 생겼을 경우 이미지가 손실 될 수 있다.
 *  따라서 실제 서버 운영시에는 AWS S3나, Cloud Stroage 같은 정적 파일 제공 서비스를 사용하여
 *  이미지를 따로 저장 하고 제공하는 것이 좋다.
 *  (multer-s3 또는 multer-google-storage 패키지)
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/* ----------------------------------------
    폴더 생성 (업로드 파일이 들어갈)
 ------------------------------------------ */
try{
    fs.readdirSync('uploads');

}catch(error){
    console.log('uploads 폴더를 생성');
    fs.mkdirSync('uploads');
}

/* ----------------------------------------
    multer 설정
 ------------------------------------------ */
const upload = multer({

    storage: multer.diskStorage({
        
        // 업로드할 폴더 위치
        destination(req, file, cb){
            console.log('* -------------------------------------------- *');
            console.log('  routes.post.js multer desination');
            console.log(`  req.url : ${req.url}`);
            console.log('* -------------------------------------------- *');
            cb(null, 'uploads/');
        },

        // 파일 이름 설정
        filename(req, file, cb){
            const ext = path.extname(file.originalname); //path.extname : 파일 확장자 추출 후 출력
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),

    // 파일 크기 설정
    limits: {fileSize: 5 * 1024 * 1024},
});

/* ----------------------------------------
    POST    /post/img   파일 업로드
    POST    /post       포스팅
 ------------------------------------------ */
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
