/* 로직
유저가 값을 입력한다
+ 버튼을 클릭하면, 할일이 추가된다
delete 버튼을 누르면 할일이 삭제된다
check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
1. check 버튼을 클릭하는 순간 true false
2. true이면 끝난걸로 간주하고 밑줄 보여주기
3. false이면 안끝난걸로 간주하고 그대로

진행중 끝남 탭을 누르면, 언더바가 이동
끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
전체탭을 누르면 다시 전체아이템으로 돌아옴
*/

let taskInput = document.querySelector('#task-input');
let addButton = document.querySelector('#add-button');
let taskBoard = document.querySelector('#task-dashboard');
let taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
  let task = {
    id: generateId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

// taskList 그리는 함수
function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task changeBg">
			<div class="task-done">${taskList[i].taskContent}</div>
			<div>
				<button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-sharp fa-solid fa-rotate-right"></i></button>
				<button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>`;
    } else {
      resultHTML += `<div class="task">
			<div>${taskList[i].taskContent}</div>
			<div>
				<button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
				<button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>`;
    }
  }

  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

//랜덤id 생성: https://gist.github.com/gordonbrander/2230317
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
