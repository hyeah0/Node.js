const request = require('supertest');
const { sequelize } = require('../models/index');
const app = require('../app');

// 테스트 전 실행
beforeAll(async ()=>{
    await sequelize.sync();
});

// 🍎 회원가입 테스트
// 🐸 테스트 - 로그인 하지 않았을 경우 가입
describe('Post /auth/join 회원가입 테스트 그룹', ()=>{
    
    // 🐸 테스트
    test('로그인 안했으면 가입', (done)=>{
        request(app).post('/auth/join')
                    .send({
                        email: 'abc@abc.com',
                        nick: 'abc',
                        password: '1234',
                    })
                    .expect('Location', '/')    // 경로는 /
                    .expect(302, done);
    });

});

// 🍎 로그인 상태 회원가입 요청시 테스트
// 🌱 사전 - 로그인 먼저 수행
// 🐸 테스트 - 로그인 되어있는 사용자가 회원가입 요청시
describe('Post /auth/join 로그인 상태 회원가입 요청시 테스트 그룹', ()=>{
    
    const agent = request.agent(app);   // request.agent() : 요청을 지속시킬수 있다

    // 🌱 사전 - 로그인 먼저 수행(각 테스트 시작전 수행)
    beforeEach((done)=>{
        agent.post('/auth/login')
             .send({
                email: 'abc@abc.com',
                password: '1234',
             })
             .end(done);
    })
 
    // 🐸 테스트
    test('로그인 이미 한 상태 redirect /', (done)=>{
        const message = encodeURIComponent('로그인한 상태 입니다.');

        agent.post('/auth/join')
             .send({
                email: 'abc@abc.com',
                nick: 'abc',
                password: '1234',
             })
             .expect('Location', `/?error=${message}`)
             .expect(302, done);
    }); 
});

// 🍎 로그인 테스트
// 🐸 테스트 - 가입되지 않았을 경우
// 🐸 테스트 - 로그인 수행
// 🐸 테스트 - 비밀번호 불일치
describe('POST /auth/login 로그인 테스트 그룹', ()=>{
    // 🐸
    test('가입되지 않은 회원', (done)=>{
        const message = encodeURIComponent('가입되지 않은 회원입니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'ababa@abc.com',
                password: '1234',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
    // 🐸
    test('로그인 수행', (done)=>{
        request(app)
            .post('/auth/login')
            .send({
                email: 'abc@abc.com',
                password: '1234',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
    // 🐸
    test('비밀번호 불일치', (done)=>{
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'abc@abc.com',
                password: '12345',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
});

// 🍎 로그아웃 테스트
// 🌱 사전 - 로그인 수행
// 🐸 테스트 - 로그아웃 수행
describe('POST /auth/logout 로그아웃 테스트 그룹', ()=>{
    
    const agent = request.agent(app);    
   
    // 🌱
    beforeEach((done)=>{
        agent
            .post('/auth/login')
            .send({
                email: 'abc@abc.com',
                password: '1234',
            })
            .end(done);
    });

    // 🐸
    test('로그아웃 수행', (done)=>{
        agent   
            .get('/auth/logout')
            .expect('Location', '/')
            .expect(302, done)
    });
});

afterAll(async ()=>{
    await sequelize.sync({force: true});
}); 
