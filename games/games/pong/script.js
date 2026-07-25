const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerScoreElement = document.getElementById("player-score");
const compScoreElement = document.getElementById("comp-score");
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const winnerText = document.getElementById('winner-text');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const WINNING_SCORE = 5;

const paddleWidth = 10, paddleHeight = 80;
const ballSize = 8;
const player = { x: 10, y: canvas.height/2 - paddleHeight/2, width: paddleWidth, height: paddleHeight, color: "#fff", score: 0, dy: 6 };
const comp = { x: canvas.width - 20, y: canvas.height/2 - paddleHeight/2, width: paddleWidth, height: paddleHeight, color: "#fff", score: 0, dy: 4 };
const ball = { x: canvas.width/2, y: canvas.height/2, radius: ballSize, speed: 6, dx: 6, dy: 6, color: "#8b5cf6" };

let upPressed = false;
let downPressed = false;
let gameActive = false;
let animationId;

document.addEventListener("keydown", (e) => {
    if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
        e.preventDefault();
    }
    else if(e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
        e.preventDefault();
    }
});
document.addEventListener("keyup", (e) => {
    if(e.key === "Up" || e.key === "ArrowUp") upPressed = false;
    else if(e.key === "Down" || e.key === "ArrowDown") downPressed = false;
});

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for(let i = 0; i <= canvas.height; i+=15) {
        drawRect(canvas.width/2 - 1, i, 2, 10, "#444");
    }
}

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 6;
    ball.dx = -ball.dx;
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function update() {
    if (upPressed && player.y > 0) player.y -= player.dy;
    if (downPressed && player.y < canvas.height - player.height) player.y += player.dy;

    // Call AI
    let compLevel = 0.1;
    comp.y += ((ball.y - (comp.y + comp.height/2))) * compLevel;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    let p = (ball.x < canvas.width/2) ? player : comp;
    if(collision(ball, p)) {
        let collidePoint = (ball.y - (p.y + p.height/2));
        collidePoint = collidePoint / (p.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.dx = direction * ball.speed * Math.cos(angleRad);
        ball.dy = ball.speed * Math.sin(angleRad);
        ball.speed += 0.2;
    }

    if(ball.x - ball.radius < 0) {
        comp.score++;
        compScoreElement.textContent = comp.score;
        resetBall();
    } else if(ball.x + ball.radius > canvas.width) {
        player.score++;
        playerScoreElement.textContent = player.score;
        resetBall();
    }

    if(player.score >= WINNING_SCORE || comp.score >= WINNING_SCORE) {
        gameActive = false;
        winnerText.textContent = player.score >= WINNING_SCORE ? "You Win!" : "Computer Wins!";
        winnerText.style.color = player.score >= WINNING_SCORE ? "#22c55e" : "#ef4444";
        gameOverScreen.classList.remove('hidden');
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
    if(!gameActive) return;
    update();
    render();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    player.score = 0;
    comp.score = 0;
    playerScoreElement.textContent = 0;
    compScoreElement.textContent = 0;
    resetBall();
    gameActive = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameLoop();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

render();
