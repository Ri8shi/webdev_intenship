const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;
let countDownTimerId = null;

function renderMoles() {
    holes.forEach(hole => {
        let mole = document.createElement('div');
        mole.classList.add('mole');
        hole.appendChild(mole);
    });
}
renderMoles();

function randomHole() {
    holes.forEach(hole => {
        hole.classList.remove('up');
    });

    let randomHole = holes[Math.floor(Math.random() * 9)];
    randomHole.classList.add('up');
    hitPosition = randomHole.id;
}

holes.forEach(hole => {
    hole.addEventListener('mousedown', () => {
        if (hole.id == hitPosition) {
            result++;
            scoreDisplay.textContent = result;
            hitPosition = null;
            hole.classList.remove('up');
            // Flash green
            hole.style.boxShadow = "inset 0 0 20px #84cc16";
            setTimeout(() => { hole.style.boxShadow = "inset 0 10px 10px rgba(0,0,0,0.8)"; }, 200);
        }
    });
});

function moveMole() {
    timerId = setInterval(randomHole, 700);
}

function countDown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        gameOverScreen.classList.remove('hidden');
    }
}

function startGame() {
    result = 0;
    currentTime = 30;
    scoreDisplay.textContent = result;
    timeLeftDisplay.textContent = currentTime;
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
