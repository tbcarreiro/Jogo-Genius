let order = [];
let clickedOrder = [];
let score = 0;
let highScores = [0, 0, 0, 0, 0];
const yellowAudio = document.querySelector("#yellowAudio");
const redAudio = document.querySelector("#redAudio");
const blueAudio = document.querySelector("#blueAudio");
const greenAudio = document.querySelector("#greenAudio");
const audioOver = document.querySelector("#audioOver");

/*  0 - verde
    1 - vermelho
    2 - amarelo
    3 - azul
*/
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

// Cria ordem aleatória
const shuffleOrder = () => {
  let colorOrder = Math.floor(4 * Math.random());
  order.push(colorOrder);
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

// Acende a próxima cor
const lightColor = (element, number) => {
  let colorNumber = number - 1;
  number = number * 600;
  setTimeout(() => {
    playAudio(element.classList[0]);
    // playAudio(colorNumber);
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number + 150);
};

// Checa se os botões clicados são os mesmos da order gerada
const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      audioOver.play();
      updateHighScore();
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    score++;
    nextLevel();
  }
};

// Função para o clique do usuario
const click = (color) => {
  clickedOrder.push(color);
  createColorElement(color).classList.add("selected");
  playAudio(color);

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 300);
};

// funçao que retorna a cor
const createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
};

// funçao para prox. nivel do jogo
const nextLevel = () => {
  showScore();
  shuffleOrder();
};

// funçao game over
const gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu"\nClick em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

const playGame = () => {
  alert("Bem vindo ao Genius. Iniciando novo jogo!");
  showHighScore();
  score = 0;
  nextLevel();
};

const showScore = () => {
  document.querySelector("#score").innerHTML = `Score: ${score}`;
};

const showHighScore = () => {
  document.querySelector(
    "#high-score"
  ).innerHTML = `Leaderboard<p>${highScores[0]}</p><p>${highScores[1]}</p><p>
  ${highScores[2]}</p><p>${highScores[3]}</p><p>${highScores[4]}</p>`;
};

const updateHighScore = () => {
  highScores.push(score);
  highScores.sort((a, b) => b - a);
};

const playAudio = (color) => {
  if (color === 0 || color === "green") {
    greenAudio.play();
  } else if (color === 1 || color === "red") {
    redAudio.play();
  } else if (color === 2 || color === "yellow") {
    yellowAudio.play();
  } else if (color === 3 || color === "blue") {
    blueAudio.play();
  }
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
