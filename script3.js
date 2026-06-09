const star = document.getElementById("star");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const levelText = document.getElementById("level");
const timeText = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let score = 0;
let lives = 3;
let level = 1;
let time = 30;

let speed = 1000;

let gameRunning = false;

let gameTimer;
let moveTimer;

function moveStar(){

  const maxX = gameArea.clientWidth - 80;
  const maxY = gameArea.clientHeight - 80;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  star.style.left = randomX + "px";
  star.style.top = randomY + "px";
}

function updateScreen(){

  scoreText.innerText = score;
  livesText.innerText = lives;
  levelText.innerText = level;
  timeText.innerText = time;
}

function startGame(){

  if(gameRunning) return;

  gameRunning = true;

  score = 0;
  lives = 3;
  level = 1;
  time = 30;
  speed = 1000;

  updateScreen();

  message.innerText = "";

  star.style.display = "block";

  moveStar();

  gameTimer = setInterval(() => {

    time--;

    updateScreen();

    if(time <= 0){

      endGame();

    }

  },1000);

  moveTimer = setInterval(() => {

    moveStar();

  },speed);

}

function endGame(){

  clearInterval(gameTimer);
  clearInterval(moveTimer);

  gameRunning = false;

  star.style.display = "none";

  message.innerHTML =
  `🏆 Fim de jogo!<br>Você fez ${score} pontos`;
}

star.addEventListener("click", () => {

  if(!gameRunning) return;

  score++;

  // sobe de nível
  if(score % 10 === 0){

    level++;

    if(speed > 400){

      speed -= 100;

      clearInterval(moveTimer);

      moveTimer = setInterval(() => {

        moveStar();

      },speed);

    }

  }

  updateScreen();

  moveStar();

});

startBtn.addEventListener("click", startGame);