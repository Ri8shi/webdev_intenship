const grid = document.getElementById('memory-grid');
const movesElement = document.getElementById('moves');
const matchesElement = document.getElementById('matches');
const finalMovesElement = document.getElementById('final-moves');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Emojis for the 8 pairs (16 cards total)
const items = ['🚀', '🍕', '🎮', '💡', '🎸', '🌟', '💎', '🔥'];

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;

function initGame() {
    grid.innerHTML = '';
    cards = [];
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matches = 0;
    movesElement.textContent = moves;
    matchesElement.textContent = matches;
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    createBoard();
}

function createBoard() {
    // Duplicate the array to create pairs
    const gameItems = [...items, ...items];
    
    // Shuffle using Fisher-Yates
    for (let i = gameItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameItems[i], gameItems[j]] = [gameItems[j], gameItems[i]];
    }

    gameItems.forEach(item => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = item;

        // Front of the card in the UI logic is the side with the question mark
        // Back of the card in the UI logic is the side with the emoji
        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${item}</div>
        `;
        
        cardElement.addEventListener('click', flipCard);
        grid.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    moves++;
    movesElement.textContent = moves;
    
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    // Slight visual feedback for matching
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    matches++;
    matchesElement.textContent = matches;

    if (matches === items.length) {
        setTimeout(() => {
            gameOverScreen.classList.remove('hidden');
            finalMovesElement.textContent = moves;
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000); // Wait a second so they can see the card
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);

// Initially render a locked board so the user sees something before clicking Start
createBoard();
lockBoard = true; 
