/* JS 로직
[O] 유저는 할일을 추가할 수 있다.
[O] 각 할일에 삭제와 체크버튼이 있다.
[O] 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
[O] 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
[O] 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
[O] 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
[] 모바일 버전에서도 확인할 수 있는 반응형 웹이다
*/

const $userInput = document.querySelector('#user-input');
const $inputBtn = document.querySelector('#input-btn');
const $contents = document.querySelector('.contents');
const $todoLists = document.querySelector('.todo-lists');
const $tasks = document.querySelectorAll('.task');
const $todoStatus = document.querySelector('.todo-status');
let userInput = null;
let todoList = [];

$userInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    makeTodo();
  }
});
$inputBtn.addEventListener('click', makeTodo);
$todoLists.addEventListener('click', e => {
  // 삭제 버튼
  if (e.target.classList.contains('remove')) {
    console.log(e.target.parentNode.parentNode.remove());
  }
  // 할일 -> 끝난 일 변경 -> 할일
  if (e.target.classList.contains('not-done')) {
    e.target.classList.remove('not-done');
    e.target.classList.add('done');
    e.target.textContent = '✅';
    e.target.parentNode.previousElementSibling.classList.add('done-task');
    e.target.parentNode.parentNode.classList.add('finished');
  } else if (e.target.classList.contains('done')) {
    console.log(e.target);
    e.target.classList.remove('done');
    e.target.classList.add('not-done');
    e.target.textContent = '⭕';
    e.target.parentNode.previousElementSibling.classList.remove('done-task');
    e.target.parentNode.parentNode.classList.remove('finished');
  }
});

function makeTodo() {
  userInput = $userInput.value;
  // 유효성 검사
  if (!userInput) {
    alert('할일을 적어주세요.');
    inputClear();
    return;
  }

  todoList = `<div class="task">
	<p>${userInput}</p>
	<div>
		<button class="btn btn-outline-info not-done">⭕</button>
		<button class="btn btn-outline-danger remove">❌</button>
	</div>
	</div>
	`;
  $todoLists.innerHTML += todoList;
  inputClear();
}

function deleteTodo(e) {
  console.log(e.target);
}

function inputClear() {
  $userInput.value = '';
  $userInput.focus();
}

// [] 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 1. ALL 버튼을 누를 때?
// task 클래스 항목에 display:block으로 변경

// 2. Not Done 버튼을 누를 때?
// task 클래스에 finished 클래스가 있으면 display:none
//  finished 항목있으면 display:block

// 3. DONE 버튼을 누를 때?
// task 클래스에 finished 클래스 있으면 display:block
// finished 클래스  없으면 display:none

$todoStatus.addEventListener('click', e => {
  if (e.target.classList.contains('todo-all')) {
    console.log('todo ALL');
    // console.dir($todoLists.children);
    for (list of $todoLists.children) {
      list.style.display = '';
    }
  } else if (e.target.classList.contains('todo-not-done')) {
    console.log('todo NOT DONE');
    for (list of $todoLists.children) {
      if (!list.classList.contains('finished')) {
        list.style.display = '';
      } else {
        list.style.display = 'none';
      }
    }
  } else if (e.target.classList.contains('todo-done')) {
    console.log('todo DONE');
    for (list of $todoLists.children) {
      if (list.classList.contains('finished')) {
        list.style.display = '';
      } else {
        list.style.display = 'none';
      }
    }
  }
});
