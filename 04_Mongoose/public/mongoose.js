console.log('mongoose.js');

/* ----------------------------------------------------------
    사용자 이름을 눌렀을때 댓글 로딩
 ------------------------------------------------------------ */
document.querySelectorAll('#user-list tr').forEach((el)=>{
    el.addEventListener('click', function(){
        const id = el.querySelector('td').textContent;
        console.log(`사용자 이름( ${id} )을 클릭했습니다.`);
        getComment(id);
    });
});

/* -----------------------------------------------------------------------
    getUser()          Get     /users
    getComment(id)     Get     /users/id/comments
    ㄴ 댓글 수정          Patch   /comments/id         comment: newComment    
    ㄴ 댓글 삭제          Delete  /comments/id             
                       
                       Post    /users               name, age, married
                       Post    /comments            id,comment
/* -----------------------------------------------------------------------
    사용자 로딩
    getUser()     Get     /users
 ------------------------------------------------------------------------- */
async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;

        const tbody = document.querySelector('.usr_tbody');
        tbody.innerHTML = '';
        users.map(function(user){
            const row = document.createElement('tr');
            row.addEventListener('click', ()=>{
                getComment(user._id);
            })

            let td = document.createElement('td');
            td.textContent = user._id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.married? '기혼': '미혼';
            row.appendChild(td);

            tbody.appendChild(row);
        });

    }catch(err){
        console.error(err);
    }
}

/* -----------------------------------------------------------------------
    사용자 로딩
    getComment(id)     Get     /users/id/comments
                       Patch   /comments/id         댓글 수정
 ------------------------------------------------------------------------- */
async function getComment(id){
    try{
        const res = await axios.get(`/users/${id}/comments`);
        const comments = res.data;

        const tbody = document.querySelector('.cmt_tbody');
        tbody.innerHTML = '';

        comments.map(function(comment){
            const row = document.createElement('tr');
            
            let td = document.createElement('td');
            td.textContent = comment._id;
            row.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = comment.commenter.name;
            row.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            
            // 수정
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async()=>{
                
                // 댓글 수정글 입력
                const newComment = prompt('바꿀 내용 입력하세요');
                if(!newComment){
                    return alert('내용을 반드시 입력해주세요.');
                }

                try{
                    await axios.patch(`/comments/${comment._id}`,{
                        comment: newComment
                    });
                    getComment(id);
                
                }catch(err){
                    console.error(err);
                }
            });

            // 삭제
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.delete(`/comments/${comment._id}`);
                    getComment(id);
                }catch(err){
                    console.error(err);
                }
            });

            // td안에 수정 버튼 넣기
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            
            // td안에 삭제 버튼 넣기
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);

            tbody.appendChild(row);
        });

    }catch(err){
        console.error(err);
    }
}

/* -----------------------------------------------------------------------
    사용자 등록
    Post    /users     name, age, married
 ------------------------------------------------------------------------- */
document.getElementById('user-form').addEventListener('submit', async (e)=>{
    e.preventDefault(); // url 이동 막기

    const name = e.target.userName.value;
    const age = e.target.userAge.value;
    const married = e.target.userMarried.checked;

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

/* -----------------------------------------------------------------------
    댓글 등록
    Post    /comments   id,comment
 ------------------------------------------------------------------------- */
document.querySelector('#comment-form').addEventListener('submit', async (e)=>{

    console.log('댓글등록');
    e.preventDefault();

    const id = e.target.commenterId.value;
    const comment = e.target.comment.value;

    console.log(`id: ${id}`);
    console.log(`comment: ${comment}`);

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

