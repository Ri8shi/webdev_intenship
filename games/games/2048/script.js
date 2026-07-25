const gridDisplay = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

let squares = [];
let score = 0;

function createBoard() {
    gridDisplay.innerHTML = '';
    squares = [];
    for (let i = 0; i < 16; i++) {
        let square = document.createElement('div');
        square.className = 'cell';
        square.innerHTML = '';
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    generate();
    generate();
}

function getColors(val) {
    const bgColors = {
        '': '#cdc1b4', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
        32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
        512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    const colors = {
        2: '#776e65', 4: '#776e65', default: '#f9f6f2'
    };
    return { bg: bgColors[val] || '#3c3a32', color: colors[val] || colors.default };
}

function updateColors() {
    for(let i=0; i<16; i++) {
        let val = squares[i].innerHTML;
        let c = getColors(val);
        squares[i].style.backgroundColor = c.bg;
        squares[i].style.color = c.color;
    }
}

function generate() {
    let emptySquares = [];
    for(let i=0; i<16; i++) {
        if(squares[i].innerHTML == '') emptySquares.push(i);
    }
    if (emptySquares.length === 0) return;
    let r = Math.floor(Math.random() * emptySquares.length);
    squares[emptySquares[r]].innerHTML = Math.random() > 0.1 ? 2 : 4;
    updateColors();
    checkForGameOver();
}

function moveRight() {
    for(let i=0; i<16; i+=4) {
        let row = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i+1].innerHTML) || 0,
            parseInt(squares[i+2].innerHTML) || 0,
            parseInt(squares[i+3].innerHTML) || 0
        ];
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        
        for(let j=0; j<4; j++) {
            squares[i+j].innerHTML = newRow[j] || '';
        }
    }
}

function moveLeft() {
    for(let i=0; i<16; i+=4) {
        let row = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i+1].innerHTML) || 0,
            parseInt(squares[i+2].innerHTML) || 0,
            parseInt(squares[i+3].innerHTML) || 0
        ];
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        
        for(let j=0; j<4; j++) {
            squares[i+j].innerHTML = newRow[j] || '';
        }
    }
}

function moveDown() {
    for(let i=0; i<4; i++) {
        let col = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i+4].innerHTML) || 0,
            parseInt(squares[i+8].innerHTML) || 0,
            parseInt(squares[i+12].innerHTML) || 0
        ];
        let filteredCol = col.filter(num => num);
        let missing = 4 - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = zeros.concat(filteredCol);
        
        for(let j=0; j<4; j++) {
            squares[i+(j*4)].innerHTML = newCol[j] || '';
        }
    }
}

function moveUp() {
    for(let i=0; i<4; i++) {
        let col = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i+4].innerHTML) || 0,
            parseInt(squares[i+8].innerHTML) || 0,
            parseInt(squares[i+12].innerHTML) || 0
        ];
        let filteredCol = col.filter(num => num);
        let missing = 4 - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = filteredCol.concat(zeros);
        
        for(let j=0; j<4; j++) {
            squares[i+(j*4)].innerHTML = newCol[j] || '';
        }
    }
}

function combineRow() {
    for(let i=0; i<15; i++) {
        if(squares[i].innerHTML === squares[i+1].innerHTML && squares[i].innerHTML !== '') {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
            squares[i].innerHTML = combinedTotal;
            squares[i+1].innerHTML = '';
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin();
}

function combineCol() {
    for(let i=0; i<12; i++) {
        if(squares[i].innerHTML === squares[i+4].innerHTML && squares[i].innerHTML !== '') {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML);
            squares[i].innerHTML = combinedTotal;
            squares[i+4].innerHTML = '';
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin();
}

// Controls
function control(e) {
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
    if(e.key === 'ArrowLeft' || e.key === 'a') { keyLeft(); }
    else if(e.key === 'ArrowRight' || e.key === 'd') { keyRight(); }
    else if(e.key === 'ArrowUp' || e.key === 'w') { keyUp(); }
    else if(e.key === 'ArrowDown' || e.key === 's') { keyDown(); }
}

document.addEventListener('keydown', control);

function keyLeft() {
    moveLeft(); combineRow(); moveLeft(); generate(); updateColors();
}
function keyRight() {
    moveRight(); combineRow(); moveRight(); generate(); updateColors();
}
function keyUp() {
    moveUp(); combineCol(); moveUp(); generate(); updateColors();
}
function keyDown() {
    moveDown(); combineCol(); moveDown(); generate(); updateColors();
}

function checkForWin() {
    for(let i=0; i<16; i++) {
        if(squares[i].innerHTML == 2048) {
            document.removeEventListener('keydown', control);
            document.querySelector('.game-over-text').textContent = 'You Win!';
            gameOverScreen.classList.remove('hidden');
        }
    }
}

function checkForGameOver() {
    let zeros = 0;
    for(let i=0; i<16; i++) {
        if(squares[i].innerHTML == '') zeros++;
    }
    if(zeros === 0) {
        // Simple check: might still be movable but we just check full board for simplicity
        document.removeEventListener('keydown', control);
        document.querySelector('.game-over-text').textContent = 'Game Over';
        gameOverScreen.classList.remove('hidden');
    }
}

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    score = 0;
    scoreDisplay.innerHTML = score;
    document.addEventListener('keydown', control);
    createBoard();
});

createBoard();
