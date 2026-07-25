const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status-display');
const restartBtn = document.getElementById('restart-btn');
const modePvpBtn = document.getElementById('mode-pvp');
const modePvcBtn = document.getElementById('mode-pvc');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let playMode = 'pvp'; // pvp or pvc

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

    if (playMode === 'pvc' && currentPlayer === 'O' && gameActive) {
        setTimeout(makeComputerMove, 500);
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        statusDisplay.style.color = currentPlayer === 'X' ? '#f43f5e' : '#3b82f6';
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    if (playMode === 'pvc' && currentPlayer === 'O') return;

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    statusDisplay.style.color = '';
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
}

function setMode(mode) {
    playMode = mode;
    if (mode === 'pvp') {
        modePvpBtn.style.filter = 'none';
        modePvpBtn.style.opacity = '1';
        modePvcBtn.style.filter = 'grayscale(100%)';
        modePvcBtn.style.opacity = '0.7';
    } else {
        modePvcBtn.style.filter = 'none';
        modePvcBtn.style.opacity = '1';
        modePvpBtn.style.filter = 'grayscale(100%)';
        modePvpBtn.style.opacity = '0.7';
    }
    handleRestartGame();
}

function makeComputerMove() {
    if (!gameActive) return;
    
    let moveIndex = findBestMove('O'); // try to win
    if (moveIndex === -1) moveIndex = findBestMove('X'); // block player
    if (moveIndex === -1 && gameState[4] === "") moveIndex = 4; // take center
    
    // Pick random
    if (moveIndex === -1) {
        let emptyCells = [];
        gameState.forEach((cell, index) => { if (cell === "") emptyCells.push(index); });
        if (emptyCells.length > 0) {
            moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
    }
    
    if (moveIndex !== -1) {
        let cellToClick = document.querySelector(`.cell[data-index='${moveIndex}']`);
        handleCellPlayed(cellToClick, moveIndex);
        handleResultValidation();
    }
}

function findBestMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        let vals = [gameState[a], gameState[b], gameState[c]];
        if (vals.filter(v => v === player).length === 2 && vals.filter(v => v === "").length === 1) {
            if (gameState[a] === "") return a;
            if (gameState[b] === "") return b;
            if (gameState[c] === "") return c;
        }
    }
    return -1;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
modePvpBtn.addEventListener('click', () => setMode('pvp'));
modePvcBtn.addEventListener('click', () => setMode('pvc'));
