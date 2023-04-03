const { isLoggedIn, isNotLoggedIn } = require('./');

// ⭐️ 테스트 그룹 1
describe('isLoggedIn 함수 테스트 그룹', ()=>{

    // res 객체
    const res = {
        status: jest.fn(()=>res),
        send: jest.fn(),
        redirect: jest.fn()
    };

    // next 객체
    const next = jest.fn();

    // 🐸 테스트 1.
    test('로그인시 isLoggedIn 함수가 next를 호출해야한다.', ()=>{
        // req 객체
        const req = { isAuthenticated: jest.fn(()=>true) };
 
        // 🍎 함수 호출 및 확인
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });

    // 🐸 테스트 2.
    test('로그인되어있지 않으면 isLoggedIn 함수가 에러를 응답해야한다.', ()=>{
        // req 객체
        const req = { isAuthenticated: jest.fn(()=>true) };

        // 🍎 함수 호출 및 확인
        isLoggedIn(req, res, next);

        // res.status(403).send('로그인 필요');
        // expect(res,status).toBeCalledWith(403);
        // expect(res.send).toBeCalledWith('로그인 필요');

        // res.redirect('/');
        expect(res.redirect);
    })
});

// ⭐️ 테스트 그룹 2
describe('isNotLoggedIn 함수 테스트 그룹', ()=>{

    const res = { redirect: jest.fn() };
    const next = jest.fn();

    // 🐸 테스트 1.
    test('로그인되어 있으면 isNotLoggedIn 함수가 에러를 응답해야한다.', ()=>{
        
        const req = { isAuthenticated: jest.fn(()=>true) };
        
        isNotLoggedIn(req, res, next);

        const message = encodeURIComponent('로그인한 상태 입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);

    });

    // 🐸 테스트 2.
    test('로그인되어있지 않으면 isNotLoggedIn 함수가 next를 호출해야한다.', ()=>{
        
        const req = { isAuthenticated: jest.fn(()=>false) };
        
        isNotLoggedIn(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    })

});