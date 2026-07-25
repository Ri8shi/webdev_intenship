const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const endMessage = document.getElementById('end-message');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let lives = 3;
let isGameOver = false;
let animationId;

// Ball
const ballRadius = 8;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;

// Paddle
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Bricks
const brickRowCount = 5;
const brickColumnCount = 9;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 20;

let bricks = [];

function initBricks() {
    bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        e.preventDefault();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        e.preventDefault();
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    scoreDisplay.textContent = score;
                    if(score == brickRowCount*brickColumnCount) {
                        endGame("You Win!");
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-10, paddleWidth, paddleHeight);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // Color based on row
                let colors = ["#f43f5e", "#f97316", "#eab308", "#10b981", "#3b82f6"];
                ctx.fillStyle = colors[r];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    if(isGameOver) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius - paddleHeight - 10) {
        // Paddle hit
        if(x > paddleX && x < paddleX + paddleWidth && y + dy < canvas.height-ballRadius - 5) {
            dy = -dy;
            // Adding a little english based on where it hit
            let deltaX = x - (paddleX + paddleWidth/2);
            dx = deltaX * 0.15; 
        } else if(y + dy > canvas.height-ballRadius) {
            lives--;
            livesDisplay.textContent = lives;
            if(!lives) {
                endGame("Game Over");
            } else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    animationId = requestAnimationFrame(draw);
}

function endGame(msg) {
    isGameOver = true;
    cancelAnimationFrame(animationId);
    endMessage.textContent = msg;
    gameOverScreen.classList.remove('hidden');
}

function startGame() {
    isGameOver = false;
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 4;
    dy = -4;
    paddleX = (canvas.width-paddleWidth)/2;
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    initBricks();
    draw();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Render initial state
initBricks();
drawBricks();
drawPaddle();
