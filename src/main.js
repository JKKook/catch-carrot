// Global variables
const CARROT_COUNT = 10;
const CARROT_SIZE = 80;

// Local variables
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

gameBtn.addEventListener("click", () => {
  initGame();
});

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
