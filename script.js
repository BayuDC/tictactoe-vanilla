const game = document.getElementById('game');
const state = document.getElementById('state');
const btnPlay = document.getElementById('btn-play');
const btnPlayX = document.getElementById('btn-play-x');
const btnPlayO = document.getElementById('btn-play-o');

let totalTurn = 0;
let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];
let play = false;
let withComputer;
let isPlayerTurn;

function updatePlayer(player) {
    if (!play) return;

    if (!player) {
        currentPlayer = currentPlayer == 'x' ? 'o' : 'x';
    }

    state.setAttribute('class', currentPlayer);
    state.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
}
function updateBoard(tile, index) {
    if (!play) return;

    tile.setAttribute('class', `tile ${currentPlayer}`);
    tile.textContent = currentPlayer.toUpperCase();
    board[index] = currentPlayer;
    totalTurn++;
}
function checkDraw() {
    if (totalTurn == 9) {
        state.removeAttribute('class');
        state.textContent = 'Draw';

        gameOver();
    }
}
function checkWin() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < wins.length; i++) {
        if (board[wins[i][0]] == board[wins[i][1]] && board[wins[i][1]] == board[wins[i][2]] && board[wins[i][2]] == currentPlayer) {
            state.setAttribute('class', currentPlayer);
            state.textContent = `Player ${currentPlayer.toUpperCase()} Win`;

            gameOver();
            return true;
        }
    }
}
function gameOver() {
    play = false;
    game.setAttribute('class', 'game');
    btnPlay.parentElement.removeAttribute('style', 'display: none');
}
function playGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    [...game.children].forEach(tile => {
        tile.setAttribute('class', 'tile');
        tile.textContent = '';
    });

    totalTurn = 0;
    play = true;

    game.setAttribute('class', 'game play');
    btnPlay.parentElement.setAttribute('style', 'display: none');
}
function computerTurn() {
    if (!play) return;
    if (!withComputer) return;

    isPlayerTurn = false;
    while (true) {
        const index = Math.floor(Math.random() * 9);
        const tile = game.children[index];
        if (isLegalMove(tile)) {
            return setTimeout(() => {
                updateBoard(tile, index);
                checkWin() || checkDraw();
                updatePlayer();
                isPlayerTurn = true;
            }, 250);
        }
    }
}
function isLegalMove(tile) {
    return !(tile.classList.contains('x') || tile.classList.contains('o'));
}

[...game.children].forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (!play) return;
        if (!isPlayerTurn) return;
        if (!isLegalMove(tile)) return;

        updateBoard(tile, index);
        checkWin() || checkDraw();
        updatePlayer();
        computerTurn();
    });
});
btnPlay.addEventListener('click', () => {
    playGame();
    currentPlayer = 'x';
    withComputer = false;
    isPlayerTurn = true;
    updatePlayer('x');
});
btnPlayX.addEventListener('click', () => {
    playGame();
    currentPlayer = 'x';
    withComputer = true;
    isPlayerTurn = true;
    updatePlayer('x');
});
btnPlayO.addEventListener('click', () => {
    playGame();
    currentPlayer = 'x';
    withComputer = true;
    isPlayerTurn = false;
    updatePlayer('x');
    computerTurn();
});
