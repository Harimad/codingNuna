/* 로직
[O] 0. 컴퓨터가 랜덤으로 1~100 사이의 숫자를 생성
[O] 1. 사용자가 입력 창에 1~100 숫자를 입력
	[O] - (유효성)1~100사이의 숫자를 입력하지 않으면, 화면에 경고문구 표시
	[O] - 작동멈춤
[O] 2. Go 버튼을 눌렀을 때 컴퓨터숫자 > 사용자숫자 이면, UP 출력
[O] 3. 컴퓨터숫자 < 사용자숫자 이면, DOWN 출력
[O] 4. 컴퓨터숫자 === 사용자숫자 이면, CORRECT 출력
[O] 5. 기회는 5번 주어짐
	[O] - 화면 로딩 후에 기회를 화면에 보여줌
[O] 6. 기회가 0번이 되면 게임종료가 되었다고 화면에 표시
	[O] - 작동멈춤
[O] 7. Reset 버튼을 눌렀을 때 기회를 초기화 시킴, 화면에 보이는 문구 변경
[O] 8. 중복된 숫자를 입력하면 화면에 중복되었다는 문구 보여주기
[] 9. CSS 적용
*/
const $userInput = document.querySelector('#user-input');
const $inputBtn = document.querySelector('#input-button');
const $resetBtn = document.querySelector('#reset-button');
const $leftChances = document.querySelector('#left-chances');
const $sign = document.querySelector('#sign');

let computerNum = null;
let userNum = 0;
let chances = 5;
let gameStatus = true;
let alreadyInputNum = [];

// 웹 로딩 후 남은 기회 데이터 삽입
window.addEventListener('load', () => {
  $leftChances.textContent = chances;
});

$inputBtn.addEventListener('click', play);
$resetBtn.addEventListener('click', reset);

function setRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // 1~100 사이 정수
  console.log(computerNum);
}
// 컴퓨터 랜덤 숫자 생성
setRandomNum();

function play() {
  userNum = $userInput.value;

  // 유효성 검사 - 1~100 정수 아니면 화면에 경고 문구 표시 & 리턴
  if (userNum < 1 || userNum > 100) {
    $sign.textContent = '1~100 사이의 정수를 입력해 주세요.';
    inputFocus();
    return;
  }

  // alreadyInputNum 배열에 userNum이 있다면 경고 문구 표시 & 멈춤
  if (alreadyInputNum.includes(userNum)) {
    $sign.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력하세요.';
    inputFocus();
    return;
  } else {
    alreadyInputNum.push(userNum);
  }

  chances--;
  $leftChances.textContent = chances;

  if (userNum > computerNum) {
    $sign.textContent = 'DOWN!';
  } else if (userNum < computerNum) {
    $sign.textContent = 'UP!';
  } else {
    $sign.textContent = 'CORRECT!';
  }

  if (chances < 1) {
    $sign.textContent = 'GAME OVER!';
    gameStatus = false;
    $inputBtn.disabled = !gameStatus;
    return;
  }

  inputFocus();
}

function reset() {
  setRandomNum();
  $sign.textContent = '게임중';
  chances = 5;
  $leftChances.textContent = chances;
  gameStatus = true;
  $inputBtn.disabled = !gameStatus;
  alreadyInputNum = [];
  inputFocus();
}

function inputFocus() {
  // 입력창 비우기 & 포커스
  $userInput.value = '';
  $userInput.focus();
}
