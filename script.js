function createCircle() {
  const circlesContainer = document.getElementById('circles-container');
  for (let count = 1; count <= 6; count += 1) {
    const circle = document.createElement('div');
    circle.classList.add('ball');
    circlesContainer.appendChild(circle);
  }
}

createCircle();

function generateRandomColor() {
  const randomNumber1 = Math.floor(Math.random() * 255);
  const randomNumber2 = Math.floor(Math.random() * 255);
  const randomNumber3 = Math.floor(Math.random() * 255);
  return `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
}
const circles = document.getElementsByClassName('ball');

function applySpecificColor(specificColor) {
  const colorToGuess = document.getElementById('rgb-color');
  colorToGuess.innerText = specificColor;
  const randomCircle = circles[Math.floor(Math.random() * circles.length)];
  randomCircle.style.backgroundColor = specificColor;
}

function applyRandomColors(specificColor) {
  for (let index = 0; index < circles.length; index += 1) {
    if (circles[index].style.backgroundColor !== specificColor) {
      circles[index].style.backgroundColor = generateRandomColor();
    }
  }
}

function incrementScore() {
  const score = document.getElementById('score').innerText;
  const increment = Number(score) + 3;
  document.getElementById('score').innerText = increment;
}

const answer = document.getElementById('answer');

function validation() {
  for (let index = 0; index < circles.length; index += 1) {
    if (circles[index].classList.contains('hitedElement')) {
      answer.style.color = 'red';
      answer.innerText = 'Reinicie o jogo';
    }
  }
}

function hitTheColor(event, specificColor) {
  validation();
  if (answer.innerText !== 'Reinicie o jogo') {
    if (event.target.style.backgroundColor === specificColor) {
      event.target.classList.add('hitedElement');
      answer.innerText = 'Acertou!';
      answer.style.color = 'rgb(8, 134, 8)';
      incrementScore();
    } else {
      answer.innerText = 'Errou! Tente novamente!';
    }
  }
}

function startGame() {
  const hitedElement = document.getElementsByClassName('hitedElement')[0];
  if (hitedElement) {
    hitedElement.classList.remove('hitedElement');
  }
  answer.innerText = 'Escolha uma cor';
  answer.style.color = 'black';
  const specificColor = generateRandomColor();
  applySpecificColor(specificColor);
  applyRandomColors(specificColor);
  for (let index = 0; index < circles.length; index += 1) {
    circles[index].addEventListener('click', (event) => {
      hitTheColor(event, specificColor);
    });
  }
}

startGame();

const resetButton = document.getElementById('reset-game');
resetButton.addEventListener('click', () => {
  startGame();
});
