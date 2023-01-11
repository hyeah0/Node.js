## 다른 js 파일 메서드 사용하기

### 방법 1. module.exports 사용 하기

- app.js 파일에 counter.js 파일의 메서드를 사용
- counter.js 파일에는 module.exports를 사용
- app.js 파일에는 require 함수 사용

- [counter.js]()
- [app.js]()

### 방법 2. 패키지 파일을 생성하기

1. terminal에 `npt init --yes` 입력해 패키지 생성

   - 생성된 패키지 "main" : ... 아래에
     <br> "type" : "module" 추가

2. counter.js 파일 메서드 앞에 export 입력
3. app.js 파일에
   <br> `import{메서드, 메서드} from './counter.js'`
   <br> 또는 전체 메서드 사용하고 싶을 경우
   <br> `import * as counter from './counter.js'`

- [package.json]()
- [counter.js]()
- [app.js]()
