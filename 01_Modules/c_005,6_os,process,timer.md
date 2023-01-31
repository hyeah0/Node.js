## OS

Node.js의 내장모듈 중 'os'는 운영체제 및 관련 유틸리티에 대한 메서드와 프로퍼티 정보를 가지고 있다.
이 모듈을 사용하면 OS의 메모리, 네트워크 인터페이스 정보, 버전, 아키텍처 등에 관한 정보를 불러올 수 있다.

## Process

Node.js의 내장모듈 중 'process'는 프로그램과 관련된 정보를 나타내는 객체이다.

## Timer

1. let a = setInterval(()=>{},1000), clearInterval(a)
2. setTimeout(()=>{},1000), clearTimeout()
3. setImmdiate(()=>{}), clearImmediate()
4. process.nextTick(()=>{})

- 1000 == 1s
- [setInterval 예시코드](https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_006_timer/app.js)
- [setTimeout, setImmdiate, process.nextTice 예시코드](https://github.com/hyeah0/Node.js/blob/main/01_Modules/code/c_006_timer/app2.js)

### - 실행되는 순서

- process.nextTick > setImmediate > setTimeout
