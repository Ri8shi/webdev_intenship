let playerScore = 0;
let compScore = 0;
let gameActive = true;
const WIN_SCORE = 10;

const playerDisplay = document.getElementById('player-display');
const compDisplay = document.getElementById('comp-display');
const resultMessage = document.getElementById('result-message');
const playerScoreEl = document.getElementById('player-score');
const compScoreEl = document.getElementById('comp-score');
const gameOverScreen = document.getElementById('game-over-screen');
const winnerText = document.getElementById('winner-text');
const restartBtn = document.getElementById('restart-btn');

const choices = document.querySelectorAll('.choice-btn');

const rpsMap = {
    'rock': '✊',
    'paper': '✋',
    'scissors': '✌️'
};

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * 3)];
}

function determineWinner(p, c) {
    if (p === c) return 'draw';
    if ((p === 'rock' && c === 'scissors') ||
        (p === 'paper' && c === 'rock') ||
        (p === 'scissors' && c === 'paper')) {
        return 'win';
    }
    return 'lose';
}

function playGame(playerChoice) {
    if (!gameActive) return;

    // Add small animation
    playerDisplay.textContent = '✊';
    compDisplay.textContent = '✊';
    playerDisplay.style.transform = 'translateY(-10px)';
    compDisplay.style.transform = 'translateY(-10px)';
    resultMessage.textContent = '...';

    setTimeout(() => {
        const compChoice = getComputerChoice();
        playerDisplay.textContent = rpsMap[playerChoice];
        compDisplay.textContent = rpsMap[compChoice];
        
        playerDisplay.style.transform = 'translateY(0)';
        compDisplay.style.transform = 'translateY(0)';

        const result = determineWinner(playerChoice, compChoice);
        
        if (result === 'win') {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            resultMessage.textContent = 'You Win! 🎉';
            resultMessage.style.color = '#22c55e';
        } else if (result === 'lose') {
            compScore++;
            compScoreEl.textContent = compScore;
            resultMessage.textContent = 'Computer Wins! 🤖';
            resultMessage.style.color = '#ef4444';
        } else {
            resultMessage.textContent = 'It\'s a Draw! 🤝';
            resultMessage.style.color = '#eab308';
        }

        if (playerScore >= WIN_SCORE || compScore >= WIN_SCORE) {
            gameActive = false;
            winnerText.innerHTML = playerScore >= WIN_SCORE ? "You Win the Match! 🎉" : "Computer Wins the Match! 🤖";
            winnerText.style.color = playerScore >= WIN_SCORE ? "#22c55e" : "#ef4444";
            gameOverScreen.classList.remove('hidden');
        }
    }, 400); // Small delay for effect
}

function startGame() {
    playerScore = 0;
    compScore = 0;
    playerScoreEl.textContent = 0;
    compScoreEl.textContent = 0;
    playerDisplay.textContent = '❓';
    compDisplay.textContent = '❓';
    resultMessage.textContent = "Let's Play!";
    resultMessage.style.color = '#06b6d4';
    gameActive = true;
    gameOverScreen.classList.add('hidden');
}

restartBtn.addEventListener('click', startGame);

choices.forEach(btn => {
    btn.addEventListener('click', () => {
        playGame(btn.id);
    });
});
