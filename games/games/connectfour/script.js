const boardUI = document.getElementById("board");
const statusUI = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");
const modePvpBtn = document.getElementById('mode-pvp');
const modePvcBtn = document.getElementById('mode-pvc');

const rows = 6;
const cols = 7;
let currPlayer = "red";
let board = [];
let gameActive = true;
let playMode = 'pvp'; // pvp or pvc

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
    init();
}

function init() {
    boardUI.innerHTML = "";
    board = Array(rows).fill(null).map(() => Array(cols).fill(""));
    gameActive = true;
    currPlayer = "red";
    statusUI.textContent = "Red's Turn";
    statusUI.style.color = "#ef4444";

    for(let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            let cell = document.createElement("div");
            cell.id = r.toString() + "-" + c.toString();
            cell.classList.add("cell");
            cell.addEventListener("click", placePiece);
            boardUI.append(cell);
        }
    }
}

function placePiece() {
    if(!gameActive) return;
    if(playMode === 'pvc' && currPlayer === 'yellow') return; // Wait for computer

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    dropPiece(c);
}

function dropPiece(c) {
    let r = rows - 1;
    while(r >= 0) {
        if(!board[r][c]) break;
        r -= 1;
    }

    if (r < 0) return false;

    board[r][c] = currPlayer;
    let cell = document.getElementById(r.toString() + "-" + c.toString());
    cell.classList.add(currPlayer);

    if(checkWinState(board)) {
        setWinner(currPlayer);
        return true;
    }

    if(gameActive) {
        currPlayer = currPlayer == "red" ? "yellow" : "red";
        statusUI.textContent = currPlayer == "red" ? "Red's Turn" : "Yellow's Turn";
        statusUI.style.color = currPlayer == "red" ? "#ef4444" : "#eab308";

        if (playMode === 'pvc' && currPlayer === 'yellow') {
            setTimeout(makeComputerMove, 500);
        }
    }
    return true;
}

function makeComputerMove() {
    if(!gameActive) return;

    let validCols = [];
    for(let c=0; c<cols; c++) {
        if(!board[0][c]) validCols.push(c);
    }
    if(validCols.length === 0) return;

    let bestCol = -1;

    // 1. Can win?
    for(let c of validCols) {
        if (simDrop(c, "yellow")) { bestCol = c; break; }
    }
    
    // 2. Must block?
    if(bestCol === -1) {
        for(let c of validCols) {
            if (simDrop(c, "red")) { bestCol = c; break; }
        }
    }

    // 3. Play strategic (center logic or random)
    if(bestCol === -1) {
        const centerPrefs = [3, 2, 4, 1, 5, 0, 6];
        for(let c of centerPrefs) {
            if(validCols.includes(c) && Math.random() > 0.4) {
                bestCol = c; break;
            }
        }
        if(bestCol === -1) {
            bestCol = validCols[Math.floor(Math.random() * validCols.length)];
        }
    }

    dropPiece(bestCol);
}

function simDrop(c, player) {
    let r = rows - 1;
    while(r >= 0) {
        if(!board[r][c]) break;
        r -= 1;
    }
    if (r < 0) return false;
    
    board[r][c] = player;
    let win = checkWinState(board);
    board[r][c] = ""; // backtrack
    return win;
}

function checkWinState(b) {
    // Horizontally
    for(let r=0; r<rows; r++){
        for(let c=0; c<cols-3; c++){
            if(b[r][c] && b[r][c] == b[r][c+1] && b[r][c] == b[r][c+2] && b[r][c] == b[r][c+3]) return true;
        }
    }
    // Vertically
    for(let c=0; c<cols; c++){
        for(let r=0; r<rows-3; r++){
            if(b[r][c] && b[r][c] == b[r+1][c] && b[r][c] == b[r+2][c] && b[r][c] == b[r+3][c]) return true;
        }
    }
    // Anti Diagonally
    for(let r=0; r<rows-3; r++){
        for(let c=0; c<cols-3; c++){
            if(b[r][c] && b[r][c] == b[r+1][c+1] && b[r][c] == b[r+2][c+2] && b[r][c] == b[r+3][c+3]) return true;
        }
    }
    // Diagonally
    for(let r=3; r<rows; r++){
        for(let c=0; c<cols-3; c++){
            if(b[r][c] && b[r][c] == b[r-1][c+1] && b[r][c] == b[r-2][c+2] && b[r][c] == b[r-3][c+3]) return true;
        }
    }
    return false;
}

function setWinner(player) {
    statusUI.textContent = (player == "red" ? "Red" : "Yellow") + " Wins!";
    gameActive = false;
}

restartBtn.addEventListener("click", init);
modePvpBtn.addEventListener('click', () => setMode('pvp'));
modePvcBtn.addEventListener('click', () => setMode('pvc'));
init();
