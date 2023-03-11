// 주소의 쿼리스트링 받아오기
const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('user-name');

// // html 태그 내의 'input-text' name에 접근
// const inputTextObjects = document.getElementsByName('input-text'); // 배열로 받아옴, 없으면 빈 배열을 받아옴
// const inputTextObject = inputTextObjects[0];
const inputTextObject = document.getElementsByName('user-name')[0];

//input value 값 넣기
inputTextObject.value = nameText;

// 쿼리스트링 getAll() 사용
const inputHiddenList = queryString.getAll('input-hidden');
const inputHidden = inputHiddenList[0];

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
    const userNameObject = form['user-name'];
    const userAgeObject = form['user-age'];
    users.push({
        name: userNameObject.value,
        age: userAgeObject.value
    });
    userNameObject.value = '';
    userAgeObject.value = '';
    usersSet();
    return usersRead();
}; 

// Read
const usersRead = function() {
    const tagDivParent = document.getElementById('tag-div-parent');
    tagDivParent.innerHTML = '';
    const tagDivChild = document.getElementById('tag-div-child');
    for (let index in users) {
        const newDivChild = tagDivChild.cloneNode(true);
        tagDivParent.appendChild(newDivChild);

        const usersNameObject = document.getElementsByName('users-name')[index];
        const usersAgeObject = document.getElementsByName('users-age')[index];
        const usersUpdateObject = document.getElementsByName('users-update')[index];
        const usersDeleteObject = document.getElementsByName('users-delete')[index];
        
        usersNameObject.value = users[index].name;
        usersAgeObject.value = users[index].age;
        usersUpdateObject.index = index; // 제공되는 .index 속성은 없음 -> 단, 모든 태그는 object 타입이기 때문에 index라는 속성을 임시 생성
        usersDeleteObject.index = index;
    }
    console.log('Read', users);
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
    const age = document.getElementsByName('users-age')[index].value;
    
    // users[index].name = name;
    // users[index].age = age;
    users[index]= {
        name : name,
        age : age
    };

    usersSet();
    return usersRead();
}; 

usersRead();
// 로그아웃 시 localStorage.removeItem - 사용 


