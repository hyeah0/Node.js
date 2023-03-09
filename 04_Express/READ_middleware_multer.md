# multer

- 이미지, 동영상 멀티파트 형식으로 업로드 할때 사용
  - 멀티파트란?
    - html form 태그에서 enctype이 multipart/form-data 인 폼을 통해
      <br>업로드 하는 데이터 형식을 의미한다.

## multer 사용하기

### 0. html form 태그 enctype="multipart/form-data"

<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="image">
    <input type="text" name="title">
    <button type="submit">업로드</button>
</form>

```
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="image">
    <input type="text" name="title">
    <button type="submit">업로드</button>
</form>
```

<br>

### 1. npm multer 다운

```
npm i multer
```

<br>

### 2. multer 기본 설정

- [app.js]

```
const multer = require('multer');

const upload = multer({

    storage: multer.diskStroage({

        destination(req, file, done){   // 저장 위치
            done(null, 'uploads/');     // done(에러시, 정상실행시 uploads 폴더 하위에 파일 저장)
        },

        filename(req, file, done){      // 파일 이름 설정
            const ext = path.extname(file.originalname);

            done(null, path.basename(file.originalname, ext)+Date.now()+ext);
            // 파일명 => 파일명 + 현재시간.확장자
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // 업로드 제한 사항
    // 파일 단위 5MB로 제한
});

```

<br>

### 3. 파일 저장 위치 폴더 생성 코드 작성

- [app.js]
- 폴더가 있을 경우 : 따로 만들지 않는다.
- 폴더가 없을 경우 : 폴더를 생성한다.

```
const fs = require('fs');

try{
    fs.readdirSync('uploads');

}catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
```

<br>

### 4. 파일 업로드

1. single : 한개만 req.file로 나머지 req.body
2. array : 여러개 req.files로 나머지 req.body
3. fields : 여러개 req.files로 나머지 req.body
   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(여러개 input 태그 키가 다름)
4. node : 모든 정보를 req.body로

<br>

#### 1. 파일을 하나만 업로드 하는 경우 (upload.single)

- single 미들웨어를 사용한다.

- [app.js]
-

<pre>
destination(req, file, done) 에 맞춰 작성
app.method('url', file, (req, res))
👉 app.post('/upload', upload.<b>single('image')</b>, (req,res)=>{})
</pre>

- upload.<b>single('image')</b>
  - 가로안의 값은 input 태그의 name 과 동일한 것으로 작성한다.
    ```
    <input type="file" ⭐️name="image"⭐️>
    ```

<pre>

const express = require('express');
const app = express();
app.set('port', process.env.PORT||3000);
<small>
const multer = require('multer');

const upload = multer({

    storage: multer.diskStroage({

        destination(req, file, done){   // 저장 위치
            done(null, 'uploads/');     // done(에러시, 정상실행시 uploads 폴더 하위에 파일 저장)
        },

        filename(req, file, done){      // 파일 이름 설정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext)+Date.now()+ext);
            // 파일명 => 파일명 + 현재시간.확장자
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // 업로드 제한 사항
    // 파일 단위 5MB로 제한
});
</small><b>
app.post('/upload', ⭐️upload.single('image')⭐️,(req, res)=>{
    console.log(req.file, req.body);
    res.send('ok');
});
</b>
</pre>

- 파일 업로드 성공시

  - 파일 정보는 <b>req.file</b> 객체 안에 들어있다.
  - req.body 에는 파일이 아닌 데이터인 title 이 들어있다.

  - req.file 객체는 하단과 같다.

  ```
  {
      fieldname: 'img',
      originalname: 'filename',           // 원래 이미지 파일명
      encoding: '7bit',
      mimetype: 'image/png',              // 파일 타입
      destination: 'uploads',             // 저장 폴더 위치
      filename: 'filenameDate.png',       // 변경된 파일이름.확장자
      path: 'uploads/filenameDate.png',   // 저장폴더위치/변경된 파일이름.확장자'
      size: 파일 크키
  }
  ```

<br>

#### 2. 파일을 여러개 업로드 하는 경우 (upload.array)

1.  html input 태그에 속성값으로 multiple을 넣는다.

    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="many" multiple>
        <input type="text" name="title">
        <button type="submit">업로드</button>
    </form>

    ```
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="many" ⭐️multiple⭐️>
        <input type="text" name="title">
        <button type="submit">업로드</button>
    </form>
    ```

2.  upload.array

    ```
    app.post('/upload', ⭐️upload.array('many')⭐️, (req, res)=>{
        console.log(req.file, req.body);
        res.send('ok');
    });
    ```

<br>

#### 3. 파일을 여러개 업로드 하는 경우 (upload.fields)

1.  html input 태그를 여러개

    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image1">
        <input type="file" name="image2">
        <input type="text" name="title">
        <button type="submit">업로드</button>
    </form>

    ```
    <form action="/upload" method="post" enctype="multipart/form-data">
        ⭐️
        <input type="file" name="image1">
        <input type="file" name="image2">
        ⭐️
        <input type="text" name="title">
        <button type="submit">업로드</button>
    </form>
    ```

2.  upload.fields

    ```
    app.post('/upload', ⭐️upload.fields([{name: 'image1'}, {name: 'image2'}])⭐️, (req, res)=>{
        console.log(req.file, req.body);
        res.send('ok');
    });
    ```

#### 4. 파일 업로드 없이 멀티파트 형식으로 업로드 (upload.node)

1.  html

<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="title">
    <button type="submit">업로드</button>
</form>

```
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="title">
    <button type="submit">업로드</button>
</form>
```

2.  upload.none

```
app.post('/upload', upload.none(), (req,res)=>{
    console.log(req.body);
    res.send('ok');
});
```
