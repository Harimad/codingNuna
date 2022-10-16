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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
}

// taskList 그리는 함수
function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
		<div>${taskList[i]}</div>
		<div>
			<button>Check</button>
			<button>Delete</button>
		</div>
	</div>`;
  }

  taskBoard.innerHTML = resultHTML;
}
