"use strict";

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

// audio variables
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

// handle Btn
gameBtn.addEventListener("click", () => {
  if (started) stopGame();
  else startGame();
});

popupBtn.addEventListener("click", () => {
  startGame();
  hidePopupMsg();
});

function startGame() {
  started = true;
  initGame();
  startTimer();
  playSound(bgSound);
}
function stopGame() {
  started = false;
  stopTimer();
  showPopupMsg(resultMsg.stop);
  playSound(alertSound);
  bgSound.pause();
}
function finishGame(win) {
  started = false;
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopTimer();
  showPopupMsg(win ? resultMsg.win : resultMsg.lose);
}

function initGame() {
  score = 0;
  gameField.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "/img/carrot.png");
  addItem("bug", CARROT_COUNT, "/img/bug.png");
}

function addItem(className, count, imgPath) {
  for (let i = 0; i < count; i++) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    const x = randomCoordinate(x1, x2);
    const y = randomCoordinate(y1, y2);

    const item = document.createElement("img");
    item.setAttribute("class", className);
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
  popup.classList.remove("pop-up--hide");
  popupText.innerHTML = text;
}

function hidePopupMsg() {
  popup.classList.add("pop-up--hide");
}

// handle timer
function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimer(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      showPopupMsg(resultMsg.lose);
      return;
    }
    updateTimer(--remainingTimeSec);
  }, 1000);
}

function updateTimer(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function stopTimer() {
  clearInterval(timer);
}
// handle score
gameField.addEventListener("click", (e) => {
  onFieldScore(e);
});

function onFieldScore(e) {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

// handle sound
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
