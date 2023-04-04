// 🍎 user 모킹
jest.mock('../models/user');
jest.mock('../models/post');
jest.mock('../models/hashtag');
const User = require('../models/user');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

const { follow } = require('./user');

// ⭐️ 테스트 그룹 1
describe('follow 테스트 그룹', ()=>{

    // 가정 : 유저id 1이 유저id 2를 팔로우
    const req = {
        user: {id: 1},  // 테스트용 임시
        params: {id: 2} // 테스트용 임시
    }

    const res = {
        status: jest.fn(()=>res),
        send: jest.fn()
    }

    const next = jest.fn();

    // 🐸 테스트 1. >> if true 일때
    test('사용자를 찾아 팔로잉 추가 후 success 응답', async () => {
        
        // 🍎 user
        User.findOne.mockReturnValue({
            addFollowing(id){
                return Promise.resolve(true);
            }
        });
        
        await follow(req, res, next);
        expect(res.send).toBeCalledWith('팔로우 성공');
    });

    // 🐸 테스트 2. >> if false 일때
    test('사용자를 못 찾으면 res.status(404), send("no user")를 호출', async () => {
        
        // 🍎 user
        User.findOne.mockReturnValue(null);
        
        await follow(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    });

    // 🐸 테스트 3. >> catch(err) 일때
    test('DB에서 에러 발생시 next(error)호출', async () => {
        
        const message = 'DB에러';

        // 🍎 user
        User.findOne.mockReturnValue(Promise.reject(message));
        
        await follow(req, res, next);
        expect(next).toBeCalledWith(message);
    });

});

