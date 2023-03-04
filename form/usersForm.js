
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
const usersCreate = function (user){
    users.push(user);
    usersSet();
    return 'Create';
}; 

// Read
const usersRead = function (){
    for(let index in users){
        document.writeln(users[index]); //index 숫자를 문자형으로 등록해도 인식함 ex)users['1'];
    }
    return users;
}; 

// Delete
const usersDelete = function(index){
    users.splice(index, 1);
    usersSet();
    return 'Deleted';
}; 

// Update
const usersUpdate = function(index, user){
    users[index] = user;
    usersSet();
    return 'Updated';
}; 

const usersSubmit = function(event, form) {
    const inputTextObject = form['input-text'];
    try {
      const evalReturn = eval(inputTextObject.value);
      // eval 은 쓰면 안되는 함수(보안 이슈)

      //**JSON.parse 함수 호출과 상관 X

      console.log(evalReturn);
    } catch(error) {
      console.error(error);
      alert(error);
      event.preventDefault();
    }
}
usersRead();

// 로그아웃 시 localStorage.removeItem - 사용 