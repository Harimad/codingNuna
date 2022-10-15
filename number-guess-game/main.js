/* 게임 로직
유저가 번호를 입력한다 그리고 go라는 버튼을 누름
만약에 유저가 랜덤번호를 맞추면, 맞췄습니다
랜덤 번호 < 유저번호, Down!
랜덤 번호 > 유저번호, Up!
Reset버튼을 누르면 게임이 리셋된다
5번의 기회를 다쓰면 게임이 끝난다 (더 이상 추측X, 버튼이 disabled)
유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회 깎지 않는다.
유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회 깎지 않는다.
*/

let computerNum = 0;
let $playButton = document.querySelector('#play-button');
let $userInput = document.querySelector('#user-input');
let $resultArea = document.querySelector('#result-area');
let $chanceArea = document.querySelector('#chance-area');
let $resetButton = document.querySelector('#reset-button');
let chances = 5;
let gameOver = false;
let history = [];

$playButton.addEventListener('click', play);
$resetButton.addEventListener('click', reset);
$userInput.addEventListener('focus', function () {
  $userInput.value = '';
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; //숫자: 1~100
  console.log(computerNum);
}

function play() {
  let userValue = $userInput.value;

  //숫자 유효성 검사
  if (userValue < 1 || userValue > 100) {
    $resultArea.textContent = '1과 100사이 숫자를 입력해 주세요';
    return;
  }

  // 데이터 유효성 검사
  if (history.includes(userValue)) {
    $resultArea.textContent =
      '이미 입력한 숫자 입니다. 다른 숫자를 입력해 주세요.';
    return;
  }

  chances--;
  $chanceArea.textContent = `남은기회: ${chances}`;
  console.log(chances);

  if (userValue < computerNum) {
    $resultArea.textContent = 'UP';
  } else if (userValue > computerNum) {
    $resultArea.textContent = 'DOWN';
  } else {
    $resultArea.textContent = 'CORRECT';
    gameOver = true;
  }

  //히스토리에 값 넣기
  history.push(userValue);
  // console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    $playButton.disabled = true;
  }
}

function reset() {
  // user input 창이 깨끗하게 정리
  $userInput.value = '';
  // 새로운 번호 생성
  pickRandomNum();
  $resultArea.textContent = '결과값이 여기 나옵니다.';
  chances = 5;
  $chanceArea.textContent = `남은기회: ${chances}`;
}

pickRandomNum();
