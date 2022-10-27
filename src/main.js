// Global variables
const CARROT_COUNT = 10;
const CARROT_SIZE = 80;
const GAME_DURATION_SEC = 10;

// Local variables
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const popup = document.querySelector(".pop-up");
const popupText = document.querySelector(".pop-up__message");
const popupBtn = document.querySelector(".pop-up__refresh");

// game variables (게임 초기값)
let started = false;
let score = 0;
let timer = undefined;

const resultMsg = {
  win: "YOU WON!🎉",
  lose: "YOU LOSE!😏",
  stop: "MORE TRY❓",
};

gameBtn.addEventListener("click", () => {
  if (started) stopGame();
  else {
    startGame();
  }
  started = !started;
});

popupBtn.addEventListener("click", () => {
  startGame();
  hidePopupMsg();
});

function startGame() {
  initGame();
  startTimer();
}
function stopGame() {
  stopTimer();
  showPopupMsg(resultMsg.stop);
}
function finishGame() {
  showPopupMsg(resultMsg.win ? resultMsg.win : resultMsg.lose);
}

function initGame() {
  addItem("carrot", CARROT_COUNT, "/img/carrot.png");
  addItem("bug", CARROT_COUNT, "/img/bug.png");
}

function addItem(className, count, imgPath) {
  for (let i = 0; i < count; i++) {
    // Random coordinates
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    const x = randomCoordinate(x1, x2);
    const y = randomCoordinate(y1, y2);
    // create item
    const item = document.createElement("img");
    item.setAttribute("className", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function randomCoordinate(min, max) {
  return Math.random() * (max - min) + min;
}

// handle pop-up
function showPopupMsg(text) {
  popup.style.display = "block";
  popupText.innerHTML = text;
}

function hidePopupMsg() {
  popup.style.visibility = "hidden";
}

// handle timer
function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimer(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      showPopupMsg(resultMsg.lose);
      return;
    }
    updateTimer(--remainingTimeSec);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimer(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}
