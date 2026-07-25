const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const btnSlow = document.getElementById('speed-slow');
const btnNormal = document.getElementById('speed-normal');
const btnFast = document.getElementById('speed-fast');

// Game constants
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state
let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoopInterval = null;
let isGameOver = false;
let currentSpeed = 100;

highScoreElement.textContent = highScore;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ];
    dx = 0;
    dy = -1; // Moving up initially
    score = 0;
    scoreElement.textContent = score;
    isGameOver = false;
    placeFood();
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Clear any existing interval to prevent speeding up
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, currentSpeed);
}

function stopGame() {
    clearInterval(gameLoopInterval);
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
    
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        stopGame();
        return;
    }
    clearCanvas();
    drawFood();
    drawSnake();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Add new head
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        placeFood();
        // Do not pop the tail, so snake grows
    } else {
        snake.pop(); // Remove tail
    }
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // Self collision (skip head)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

function clearCanvas() {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((part, index) => {
        // Head is a different color
        if (index === 0) {
            ctx.fillStyle = '#34d399'; // Lighter green for head
        } else {
            ctx.fillStyle = '#10b981'; // Primary green for body
        }
        
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
        
        // Slight inner shadow/border for segment definition
        ctx.strokeStyle = '#064e3b';
        ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
    });
}

function drawFood() {
    ctx.fillStyle = '#ef4444'; // Red food
    ctx.beginPath();
    // Draw food as a circle
    const radius = (gridSize / 2) - 2;
    const centerX = (food.x * gridSize) + (gridSize / 2);
    const centerY = (food.y * gridSize) + (gridSize / 2);
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function placeFood() {
    let newFood;
    let validPosition = false;
    
    while (!validPosition) {
        validPosition = true;
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Ensure food isn't spawned ON the snake
        for (let part of snake) {
            if (part.x === newFood.x && part.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
    }
    food = newFood;
}

// Input handling
document.addEventListener('keydown', (e) => {
    // Prevent default scrolling for arrow keys
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    
    // Don't process input if game is over
    if (isGameOver) return;
    
    // Prevent 180-degree immediate turns
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (!goingDown) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (!goingUp) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (!goingRight) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (!goingLeft) { dx = 1; dy = 0; }
            break;
    }
});

function setSpeed(speedMode, ms) {
    currentSpeed = ms;
    // reset styling
    [btnSlow, btnNormal, btnFast].forEach(btn => {
        btn.style.filter = 'grayscale(100%)';
        btn.style.opacity = '0.6';
    });
    // highlight selected
    if(speedMode === 'slow') { btnSlow.style.filter = 'none'; btnSlow.style.opacity = '1'; }
    else if(speedMode === 'normal') { btnNormal.style.filter = 'none'; btnNormal.style.opacity = '1'; }
    else if(speedMode === 'fast') { btnFast.style.filter = 'none'; btnFast.style.opacity = '1'; }

    // Apply speed immediately if game is currently running
    if (!startScreen.classList.contains('hidden') === false && !isGameOver && gameLoopInterval) {
        clearInterval(gameLoopInterval);
        gameLoopInterval = setInterval(gameLoop, currentSpeed);
    }
}

btnSlow.addEventListener('click', () => setSpeed('slow', 150));
btnNormal.addEventListener('click', () => setSpeed('normal', 100));
btnFast.addEventListener('click', () => setSpeed('fast', 60));

startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);

// Initial draw
clearCanvas();
drawSnake(); // Won't show much until init but good for empty board state
