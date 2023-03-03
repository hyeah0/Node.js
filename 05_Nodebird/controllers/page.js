// 파일로 연결
// res.render('views 폴더의 파일명', {title: })
 
exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내 정보'});
}

exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원가입'});
}

exports.renderMain = (req, res) => {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
};