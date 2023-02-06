console.log('restFront.js')

/* ------------------------------------------------------------------------------------ */
// 로딩 시 사용자 가져오는 함수, input 등록, 수정, 삭제시 사용 함수
/* ------------------------------------------------------------------------------------ */
async function getUser() { 
  try {

    //axios를 사용해서 GET, PUT, POST, DELETE 등의 메서드로 API 요청을 할 수 있다.

    // req.method === 'GET' *************************************************
    const res = await axios.get('/users');
    
    const users = res.data;
    console.log('users');
    console.log(users)      // Object  1675684895337: "dddd"
    console.log('-------------------------')
    
    const list = document.getElementById('list');
    list.innerHTML = '';
    
    /*
      Object.keys() 메서드
      주어진 객체의 속성, 이름들을 일반적인 반복문과 동일한 순서로 순회, 열거할 수 있는 배열로 반환
      map()
      배열내의 모든 요소 각각에 대해 주어진 함수를 호출한 결과를 새로운 배열에 반환

    */

    /* -------------------------------------------------------------------------------- */
    // input수정, 삭제시 이벤트 
    /* -------------------------------------------------------------------------------- */
    Object.keys(users).map(function (key) {

      // html 요소 생성
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      
      /* -------------------------------------------------------------------------- */
      // html 요소,이벤트 생성 - 수정 버튼
      /* -------------------------------------------------------------------------- */
      const edit = document.createElement('button');

      // span html 요소의 텍스트는 users 객체의 값
      span.textContent = users[key];

      // html 버튼 텍스트
      edit.textContent = '수정';
      
      // html 수정 버튼 클릭 이벤트
      edit.addEventListener('click', async () => { 

        // 변경할 이름을 작성할 메세지 창
        const name = prompt('바꿀 이름을 입력하세요');
        
        // 메세지 창이 null 일때 알럿창 
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다');
        }

        // 메세지 창이 null이 아닐경우
        try {
          console.log('users.key / users.name')
          console.log(`${key} / ${name}`)

          // req.method === 'PUT' *************************************************
          await axios.put('/user/' + key, { name });
          getUser();

        } catch (err) {
          console.error(err);
        }

      });

      /* -------------------------------------------------------------------------- */
      // html 요소,이벤트 생성 - 삭제 버튼
      /* -------------------------------------------------------------------------- */
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      
      // html 삭제 버튼 클릭 이벤트
      remove.addEventListener('click', async () => { 
        
        try {
          console.log('users.key / users.name')
          console.log(`${key}`)

          // req.method === 'DELETE' **********************************************
          await axios.delete('/user/' + key);
          getUser();
        
        } catch (err) {
          console.error(err);
        }
      });

      /*
        Node.appendChild() 메소드
          한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙인다.
          <div id="list"> >>> list
            <div>         >>> userDiv
              <span>입력값</span>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
       */
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);


      console.log('res.data');
      console.log(res.data);
      console.log('-------------------------')
    });
  } catch (err) {
    console.error(err);
  }

}//getUser 마지막

// 화면 로딩 시 getUser 호출
window.onload = getUser; 

/* -------------------------------------------------------------------------------- */
// 폼 제출(submit) 시 실행
/* -------------------------------------------------------------------------------- */
let form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
  
  /*
    Event 인터페이스의 preventDefault() 메서드
    어떤 이벤트를 명시적으로 처리하지 않은 경우, 
    해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정
  */
  e.preventDefault();

  /* Event 인터페이스의 target 속성
     이벤트가 발생한 대상 객체
  */
  const name = e.target.username.value;

  console.log('e.target.username');
  console.log(e.target.username);       // id가 username인 태그 <input type="text" id="username">
  console.log(e.target.username.value); // input 태그의 값       aaaa
  console.log('-------------------------')
  
  // input 값을 작성하지 않을경우
  if (!name) {
    return alert('이름을 입력하세요');
  }

  // input 값이 null이 아닐경우
  try {

    // req.method === 'POST' ************************************************
    await axios.post('/user', { name });
    getUser();

  } catch (err) {
    console.error(err);
  }

  // input 값을 공란 처리
  e.target.username.value = '';
});
