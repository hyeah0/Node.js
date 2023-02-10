## NPM

- Node Package Manager
- 라이브러리 관리자
- [npm docs](https://docs.npmjs.com/cli/v7/commands/npm-init)
- [npm version 관리 참고](https://docs.npmjs.com/about-semantic-versioning)
- [npm version range 참고](https://semver.npmjs.com/)

### - version

```
  0   .   0   .   0
major . minor . patch
```

- major : 큰 기능 변경, 추가될 경우 업데이트
  - major : major version 업데이트시 신경써서 확인 필요
    <br>이유 : 라이브러리 사용하는 방식이 변경될 수 도 있음
- minor : 작은 기능 추가 될 경우 업데이트
- patch : 사소한 오류 수정 될 경우 업데이트

## - NPM 생성

1. 터미널에 `npt init --yes` 작성
2. package.json 파일이 생성

## - NPM 다운로드

- `npm install` 또는 `npm i`
- 대체 가능 etc
  ```
  i, in, ins, inst, insta, instal, isnt, isnta, isntal, add
  ```
- `npm i -h` : npm 관련 옵션 확인 가능

- 글로벌 옵션으로 다운 받을 경우
  <br> `npm i -g`
- npm에서 글로벌로 패키지를 설치시 sudo(파워 권한)으로 설치하는 것을 지양
  <br>파워 권한은 보안에 안전하지 않다.

## - NPM 리스트 확인

- `npm list`
- `npm list -g` >>> 전역 NPM 리스트 확인 가능
- `npm ls nodemon` >>> 프로젝트에서 nodemon이 사용되고 있는지 확인

- 대체 가능 etc
  ```
  list, ls, ll
  ```
  - ll 은 상세 확인 가능

## - NPM 라이브러리 삭제

- `npm un 라이브러리이름`

## - package-lock.json 삭제
- `rm -rf package-lock.json`

## - node-modules 삭제
- `rm -rf node-modules`

## - npm 모듈 재설치
- `npm install`

## - NPM 라이브러리 업데이트

- `npm outdate` >>> 업데이트가 필요한 라이브러리 확인 가능
- `npm update` >>> 업데이트 필요한 라이브러리들 전체 업데이트
- `npm update 라이브러리이름` >>> 특정 라이브러리만 업데이트

## - NPM 개발시에만 필요한 라이브러리

- `npm i 라이브러리명 --save-dev` >>> 개발시 필요한 라이브러리 다운
- package.json에 devDependencies는 개발시에만 사용되는 라이브러리이다.

  ```
  "devDependencies": {
      "nodemon": "^2.0.20"
  }
  ```

## - 추천 라이브러리

### - nodemon

- `npm view nodemon` >>> node를 끊임없이 동작하면서 파일변경시 재시작
- 순서
  1. 터미널에 `npm init --yes`
  2. `npm i nodemon` 다운
  - 전역 다운시 `npm i nodemon -g`
  3. package.json 파일 "scripts" 에 "start" 기입
     <br> `"start" : "nodemon 실행파일명"`
  4. `npm start` 입력
  5. 3번단계에서 입력했던 실행파일이 업데이트 될때마다 자동으로 재시작 된다.
