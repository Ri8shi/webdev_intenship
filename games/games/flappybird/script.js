const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let frames = 0;
let score = 0;
let gameActive = false;
let pipes = [];

const bird = {
    x: 50, y: 150, width: 20, height: 20,
    gravity: 0.25, jump: 4.6, speed: 0,
    draw: function() {
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    },
    update: function() {
        this.speed += this.gravity;
        this.y += this.speed;
        if(this.y + this.height/2 >= canvas.height - 50) { // Floor collision
            gameActive = false;
            gameOverScreen.classList.remove('hidden');
        }
    },
    flap: function() {
        this.speed = -this.jump;
    }
};

function drawFloor() {
    ctx.fillStyle = "#ded895";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function drawPipes() {
    if(frames % 100 == 0) {
        let topY = Math.random() * (canvas.height/2) - canvas.height/2;
        pipes.push({
            x: canvas.width,
            y: topY,
            width: 40,
            height: canvas.height/2,
            gap: 120,
            passed: false
        });
    }
    
    for(let i=0; i<pipes.length; i++) {
        let p = pipes[i];
        ctx.fillStyle = "#22c55e"; // Green pipe
        
        // top pipe
        ctx.fillRect(p.x, p.y, p.width, p.height);
        // bottom pipe
        ctx.fillRect(p.x, p.y + p.height + p.gap, p.width, canvas.height - (p.y + p.height + p.gap) - 50);

        p.x -= 2;

        if(p.x + p.width < 0) {
            pipes.shift();
            i--;
        }

        // Collision detection
        if(bird.x + bird.width/2 > p.x && bird.x - bird.width/2 < p.x + p.width && 
           (bird.y - bird.height/2 < p.y + p.height || bird.y + bird.height/2 > p.y + p.height + p.gap)) {
            gameActive = false;
            gameOverScreen.classList.remove('hidden');
            return;
        }

        // Score update
        if(p.x + p.width < bird.x - bird.width/2 && !p.passed) {
            score++;
            scoreDisplay.textContent = score;
            p.passed = true;
        }
    }
}

function gameLoop() {
    if(!gameActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas with #70c5ce from css
    // Because CSS background is used, rect over to refresh canvas context bg color if needed
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    bird.update();
    bird.draw();
    drawPipes();
    drawFloor();
    
    frames++;
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    bird.y = 150;
    bird.speed = 0;
    pipes = [];
    score = 0;
    frames = 0;
    scoreDisplay.textContent = score;
}

startBtn.addEventListener('click', () => {
    resetGame();
    startScreen.classList.add('hidden');
    gameActive = true;
    gameLoop();
});

restartBtn.addEventListener('click', () => {
    resetGame();
    gameOverScreen.classList.add('hidden');
    gameActive = true;
    gameLoop();
});

canvas.addEventListener("click", () => {
    if(gameActive) bird.flap();
});
document.addEventListener("keydown", (e) => {
    if(e.code == "Space" && gameActive) {
        bird.flap();
        e.preventDefault();
    }
});

// Draw initial state
ctx.fillStyle = "#70c5ce";
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawFloor();
bird.draw();
