/* TODO LOGIC
 *
 * 입력 & 추가
 * [O] 유저가 값을 입력한다
 * [] 유효성 검사 (빈 값이 들어가면 그대로 종료)
 * [O] '+' 버튼을 클릭하면, 할일이 추가된다
 * [O] 입력 창에서 'Enter'를 누르면, 할일이 추가된다
 * 	- 콜백 함수 생성
 *
 * 할 일/끝난 일
 * [O] check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
 * 	1. check 버튼을 클릭하는 순간 true ↔ false 변경된다.
 * 	2. true이면 끝난걸로 간주하고 밑줄 보여주기
 * 	3. false이면 안끝난걸로 간주하고 그대로
 *
 * 삭제
 * [O] delete 버튼을 누르면 할일이 삭제된다
 *
 * 메뉴 슬라이딩
 * [O] 진행중 끝남 탭을 누르면, 언더바가 이동
 *
 * 메뉴
 * [O] 전체탭을 누르면, 전체 TODO 보여줌
 * [O] 끝남탭을 누르면, 끝난 TODO 보여줌
 * [O] 진행중탭을 누르면, 진행중인 TODO 보여줌
 * 스타일적용
 * +a
 */
const $userInput = document.querySelector('#user-input');
const $inputBtn = document.querySelector('#button-addon');
const $taskBoard = document.querySelector('#task-board');
const $taskStatus = document.querySelectorAll('#task-board > p');
const $taskLists = document.querySelector('#task-lists');
const $underline = document.querySelector('#underline');

let taskLists = [];
let sortedLists = [];
let showMode = 'all';

$userInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    addTask();
  }
});
$inputBtn.addEventListener('click', addTask);
$taskStatus.forEach(status => {
  status.addEventListener('click', sortTodos);
});
$taskStatus.forEach(status => {
  status.addEventListener('mouseover', moveMenu);
});

function addTask() {
  let task = {
    id: generateId(),
    todo: $userInput.value,
    isComplete: false,
  };
  // input 유효성 검사
  if (task.todo.trim() == '') {
    alert('할일을 입력해 주세요.');
    inputFocus();
    return;
  }
  taskLists.push(task);
  console.log(taskLists);
  render();
}

function render() {
  let refinedLists = [];
  if (showMode == 'all') {
    refinedLists = taskLists;
  } else if (showMode == 'ongoing') {
    for (let i = 0; i < taskLists.length; i++) {
      if (taskLists[i].isComplete == false) {
        refinedLists.push(taskLists[i]);
      }
    }
  } else if (showMode == 'done') {
    for (let i = 0; i < taskLists.length; i++) {
      if (taskLists[i].isComplete == true) {
        refinedLists.push(taskLists[i]);
      }
    }
  }

  let task = ``;

  for (let i = 0; i < refinedLists.length; i++) {
    if (refinedLists[i].isComplete == true) {
      task += `<div class="task toggleBg" id='${refinedLists[i].id}' >
    <p class="finished">${refinedLists[i].todo}</p>
    <div>
      <button onclick="toggleComplete('${refinedLists[i].id}')" class="btn btn-success"><i class="fa-solid fa-repeat"></i></button>
      <button onclick="deleteItem('${refinedLists[i].id}')" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>`;
    } else {
      task += `<div class="task" id='${refinedLists[i].id}'>
      <p>${refinedLists[i].todo}</p>
      <div>
      <button onclick="toggleComplete('${refinedLists[i].id}')" class="btn btn-success"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteItem('${refinedLists[i].id}')" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>`;
    }
  }
  $taskLists.innerHTML = task;
  inputFocus();
}

function toggleComplete(id) {
  for (let i = 0; i < taskLists.length; i++) {
    if (taskLists[i].id == id) {
      taskLists[i].isComplete = !taskLists[i].isComplete;
      break;
    }
  }

  render();
}

function deleteItem(id) {
  for (let i = 0; i < taskLists.length; i++) {
    if (taskLists[i].id == id) {
      taskLists.splice(i, 1);
      break;
    }
  }
  render();
}

function sortTodos(e) {
  // Show Mode (all, ongoing, done) 변경
  showMode = e.target.id;
  render();
}

function generateId() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map(A => A.toString(36))
      .join('')
  ).replace(/\./g, '');
}

function inputFocus() {
  $userInput.value = '';
  $userInput.focus();
}

// underline 이벤트
function moveMenu(e) {
  $underline.style.top = e.target.offsetTop + e.target.offsetHeight + 'px';
  $underline.style.left = e.target.offsetLeft + 'px';
  $underline.style.width = e.target.offsetWidth + 'px';
}
