/* ----------------------------------------------------------- 
    이미지 변경 될 경우
-------------------------------------------------------------- */
if(document.getElementById('img')){
    let img = document.getElementById('img');
    
    // 이미지가 변경 될 경우
    img.addEventListener('change', function(e){
        
        console.log('main.html 이미지가 변경 되었습니다.')
        console.log(this, this.files);

        const formData = new FormData();
        formData.append('img', this.files[0]);

        // /post/img formData 주고 해당 데이터를 post 하기
        // 그리고 응답값을 html 태그 값으로 주기
        axios.post('/post/img', formData)
                .then((res) => {
                document.getElementById('img-url').value = res.data.url;
                document.getElementById('img-preview').src = res.data.url;
                document.getElementById('img-preview').style.display = "inline";
                })
                .catch((err)=>{
                console.error(err);
                });
    });
};

/* ----------------------------------------------------------- 
    팔로우 하기 버튼 클릭
-------------------------------------------------------------- */
document.querySelectorAll('.twit-follow').forEach(function(tag){
    
    // 버튼 한개씩 >> tag
    tag.addEventListener('click', function(){

        // #my-id = [views]/[layout.html] 폴더에 input hidden으로 있다.
        const myId = document.querySelector("#my-id");
        if(!myId){
            console.log('로그인 전');
            alert('로그인 먼저 해주세요');
            const input_email = document.querySelector('#email');

            input_email.style.backgroundColor = "#3f1c8c29";
            input_email.style.boxShadow = "rgba(0, 0, 0, 0.18) 0px 2px 4px";

            input_email.addEventListener('keyup',()=>{
                input_email.style.backgroundColor = "";
                input_email.style.boxShadow = "";
            })
        
        }else{
            const userId = tag.parentNode.querySelector('.twit-user-id').value;

            console.log('로그인 ok >> main.html 팔로우 버튼 클릭');
            console.log(`myId : ${myId} / userId : ${userId}`);

            if(userId !== myId.value){
                if(confirm('팔로잉 하시겠습니까?')){

                    axios.post(`/user/${userId}/follow`)
                            .then(()=>{
                            location.reload();
                            })
                            .catch((err)=>{console.log(err);});
                }
            }
        }
    }); // follow button click event end
}); // follow button foreach end

/* ----------------------------------------------------------- 
    글 수정 / 글 삭제
    // postUserId : 포스트 작성자 id
    // postId : 포스트 고유 id
-------------------------------------------------------------- */
function updatePost(postUserId, postId){
    console.log('update post');

    const updateText = document.querySelector(`.twit_${postId} .twit-content`);
    const beforeText = updateText.innerText;
    const updateImg = document.querySelector(`.twit_${postId} .twit-img`);
    
    // 이미지가 있을 경우
    if(updateImg){
        console.log('img가 있습니다');
        const imgsrc = document.querySelector(`.twit_${postId} .twit-img img`).src;
        changeImg(updateImg, imgsrc);
    }

    const btnGroup = document.querySelector(`.twit_btn_${postId}`);

    updateText.innerHTML = `<div class="input-group">
                                <textarea class="change-content" id="twit" maxlength="140" rows="5" cols="80" required>${beforeText}</textarea>
                            </div>`;
    btnGroup.innerHTML = `<button type="button" class="btn" onclick="updateOkPost(${postUserId},${postId})">수정완료</button>
    <button type="button" class="btn" onclick="location.href='/'">취소</button>`;
}

// 이미지 변경
// updateImg == document.querySelector(`.twit_${postId} .twit-img`);
function changeImg(updateImg, imgsrc){

    updateImg.innerHTML = `<img id="change-img-preview" src="${imgsrc}" alt="섬네일" width="150">
                            <input id="change-img-url" type="hidden" value="${imgsrc}"> 
                            <div class="twit-img-upload">
                            <label id="img-label" for="change-img">이미지 수정</label>
                            <input id="change-img" class="change-img input-img" type="file" accept="image/*" >
                            </div>`;

    const afterImg = document.querySelector('.change-img');
   
    afterImg.addEventListener('change', function(e){
        console.log('이미지가 변경 되었습니다.')
        console.log(this, this.files);  // 파일태그, 파일 정보

        const formData = new FormData();
        formData.append('img', this.files[0]);

        axios.post('/post/img', formData)
             .then((res) => {
                document.getElementById('change-img-url').value = res.data.url;
                document.getElementById('change-img-preview').src = res.data.url;
                document.getElementById('change-img-preview').style.display = "inline";
             })
             .catch((err)=>{
                console.error(err);
             });
    });

}

// 글 수정 완료
function updateOkPost(postUserId, postId){
    console.log('수정중..!');
    const changeContent = document.querySelector('.change-content').value;
    let changeImgUrl = '';
    if(document.querySelector(`.twit_${postId} .twit-img`)){
        changeImgUrl = document.querySelector('#change-img-url').value;
    }

    axios.put('/post/change',{
        data: {
            postUserId : postUserId,
            postId: postId,
            changeContent: changeContent,
            changeImgUrl: changeImgUrl,
        }
    })
        .then(()=>{ location.reload(); })
        .catch((err)=>{ console.log(err); });
}

// 글 삭제
function deletePost(postUserId, postId){
    console.log('delete post');
    
    if(confirm('글을 삭제 하시겠습니까?')){
        axios.delete('/post/delete',{
            data: {
                postUserId : postUserId,
                postId: postId,
            }
        })
            .then(()=>{ location.reload(); })
            .catch((err)=>{ console.log(err); });
    }
}