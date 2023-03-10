// 주소의 쿼리스트링 받아오기
const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text');

// // html 태그 내의 'input-text' name에 접근
// const inputTextObjects = document.getElementsByName('input-text'); // 배열로 받아옴, 없으면 빈 배열을 받아옴
// const inputTextObject = inputTextObjects[0];
const inputTextObject = document.getElementsByName('input-text')[0];

//input value 값 넣기
inputTextObject.value = nameText;

// 쿼리스트링 getAll() 사용
const inputHiddens = queryString.getAll('input-hidden');
const inputHidden = inputHiddens[0];

inputTextObject.focus();
inputTextObject.blur();

const sessionStorageGet = sessionStorage.getItem('users'); // 배열 변수명은 복수로 작명하기
const usersLogical = sessionStorageGet || '[]';
const users = JSON.parse(usersLogical);
 
//리팩토링 하기
const usersSet = function(){
    const usersSet = JSON.stringify(users);
    sessionStorage.setItem('users', usersSet);
    // window.location.reload();
}


// Create
const usersCreate = function (form){
    const inputTextObject = form['input-text'];
    users.push(inputTextObject.value);
    usersSet();
    inputTextObject.value = '';
    return usersRead();
}; 

// Read
const usersRead = function (){
    const tagPre = document.getElementById('tag-pre');
    tagPre.innerHTML = '';
    for (let index in users) {
        tagPre.innerHTML += '<input type="text" name="users-name" value="' + users[index] + '">';
        tagPre.innerHTML += '<button onclick="usersUpdate(' + index + ')">Update</button>';
        tagPre.innerHTML += '<button onclick="usersDelete(' + index + ')">Delete</button>';
        tagPre.innerHTML += '\n';
    }
    console.log('Readed', users);
    return users;
}; 

// Delete
const usersDelete = function(index){
    users.splice(index, 1);
    usersSet();
    return usersRead();
}; 

// Update
const usersUpdate = function(index){
    const name = document.getElementsByName('users-name')[index].value;
    users[index] = name;
    usersSet();
    return usersRead();
}; 

const usersSubmit = function(event, form) {
    const inputTextObject = form['input-text'];
    try {
      const evalReturn = eval(inputTextObject.value);

      console.log(evalReturn);
    } catch(error) {
      console.error(error);
      alert(error);
      event.preventDefault();
    }
}

usersRead();
// 로그아웃 시 localStorage.removeItem - 사용 


