console.log('sequelize.js');

/* --------------------------------------------------------------------------------- */
// 이벤트 : 사용자 이름을 눌렀을때 댓글 로딩
/* --------------------------------------------------------------------------------- */
let user_list_tr = document.querySelectorAll('#user-list tbody tr');

user_list_tr.forEach((el)=>{
    el.addEventListener('click',function(){
        const id = el.querySelector('td').textContent;
        console.log(`클릭한 id는 >>> ${id}`);
        getComment(id);
    })
})

/* --------------------------------------------------------------------------------- */
// 사용자 로딩 함수 (getUser())
/* --------------------------------------------------------------------------------- */
async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        console.log('------- users -------');
        console.log(users);

        const tbody = document.querySelector('.usr_tbody');
        tbody.innerHTML = '';

        users.map(function(user){
            // 로우 추가
            const row = document.createElement('tr');
            row.addEventListener('click',()=>{
                getComment(user.id);
            });

                // 아이디
                let td = document.createElement('td');
                td.textContent = user.id;
                row.appendChild(td);

                // 이름
                td = document.createElement('td');
                td.textContent = user.name;
                row.appendChild(td);

                // 나이
                td = document.createElement('td');
                td.textContent = user.age;
                row.appendChild(td);

                // 결혼 여부
                td = document.createElement('td');
                td.textContent = user.married? '기혼' : '미혼';
                row.appendChild(td);

            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
}

/* --------------------------------------------------------------------------------- */
// 특정 댓글 로딩 함수 (getComment(id))
/* --------------------------------------------------------------------------------- */
async function getComment(id){
    console.log('[ ---------- sequelize.js getCooment(id) : 댓글 로딩 함수 ---------- ]')
    try{
        const res = await axios.get(`/users/${id}/comments`);
        const comments = res.data;
        console.log('가져온 데이터');
        console.log(comments);

        const tbody = document.querySelector('.cmt_tbody');
        tbody.innerHTML = '';

        comments.map(function(comment){
            console.log(comment);
            // 로우 추가
            const row = document.createElement('tr');
            
                // 아이디
                let td = document.createElement('td');
                td.textContent = comment.id;
                row.appendChild(td);

                // 이름
                td = document.createElement('td');
                td.textContent = comment.name;
                row.appendChild(td);

                // 댓글
                td = document.createElement('td');
                td.textContent = comment.comment;
                row.appendChild(td);

                // 수정 버튼
                const edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', async () => { // 수정 클릭 시
                    const newComment = prompt('바꿀 내용을 입력하세요');
                    if (!newComment) {
                      return alert('내용을 반드시 입력하셔야 합니다');
                    }

                    try {
                        console.log(`commentid : ${comment.cmtCreatedId}`);
                        await axios.patch(`/comments/${comment.cmtCreatedId}`, { comment: newComment });
                        getComment(id);
                    } catch (err) {
                        console.error(err);
                    }
                });
           
                // 삭제 버튼 
                const remove = document.createElement('button');
                remove.textContent = '삭제'
                remove.addEventListener('click', async () => {
                    try{
                        await axios.delete(`/comments/${comment.cmtCreatedId}`);
                        getComment(id);
                    }catch(err){
                        console.error(err);
                    }
                });

                // 수정 + 삭제 버튼 td안에 위치
                td = document.createElement('td');
                td.appendChild(edit);
                row.appendChild(td);

                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);

            tbody.appendChild(row);
        }); //comments.map 끝
    }catch(err){
        console.error(err);
    }
}

/* --------------------------------------------------------------------------------- */
// 사용자 등록 시
/* --------------------------------------------------------------------------------- */
let user_form = document.querySelector('#user-form');

user_form.addEventListener('submit', async (e) =>{

    let ckMarried = 0;
    if(document.querySelector('#userMarried').checked){
        ckMarried = 1;
    }

    // 이벤트 기본동작 실행 막기
    // url 이동 막기
    e.preventDefault();

    const name = e.target.userName.value;
    const age = e.target.userAge.value;
    const married = ckMarried;

    if(!name){
        return alert('이름을 입력하세요');
    }
    if(!age){
        return alert('나이를 입력하세요');
    }

    try{
        await axios.post('/users', {name, age, married});
        getUser();

    }catch(err){
        console.error(err);
    }

    e.target.userName.value = '';
    e.target.userAge.value = ''
    e.target.userMarried.checked = false;
});

/* --------------------------------------------------------------------------------- */
// 댓글 등록 시
/* --------------------------------------------------------------------------------- */
let comment_form = document.querySelector('#comment-form');
comment_form.addEventListener('submit', async (e)=>{
    
    console.log('[ ---------- sequelize.js 댓글 등록 ---------- ]')
    
    e.preventDefault();
    const id = parseInt(e.target.commenterId.value);
    const comment = e.target.comment.value;
    console.log(`${id} : ${comment}`);

    if(!id){
        return alert('아이디를 입력하세요');
    }
    if(!comment){
        return alert('댓글을 입력하세요.');
    }

    try{
        await axios.post('/comments', {id,comment});
        getComment(id);

    }catch(err){
        console.error(err);
    }

    e.target.commenterId.value = '';
    e.target.comment.value = '';
});