const tiles = document.getElementById('game').children;
const state = document.getElementById('state');
const btnReset = document.getElementById('btn-reset');

let totalTurn = 0;
let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];

function updatePlayer(player) {
    if (!player) {
        currentPlayer = currentPlayer == 'x' ? 'o' : 'x';
    }

    state.setAttribute('class', currentPlayer);
    state.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
}
function updateBoard(tile, index) {
    tile.setAttribute('class', `tile ${currentPlayer}`);
    tile.textContent = currentPlayer.toUpperCase();
    board[index] = currentPlayer;
    totalTurn++;
}
function checkDraw() {
    if (totalTurn == 9) {
        state.removeAttribute('class');
        state.textContent = 'Draw';
    }
}

[...tiles].forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (tile.classList.contains('x') || tile.classList.contains('o')) return;

        updateBoard(tile, index);
        updatePlayer();
        checkDraw();
    });
});
btnReset.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    [...tiles].forEach(tile => {
        tile.setAttribute('class', 'tile');
        tile.textContent = '';
    });

    totalTurn = 0;
    currentPlayer = 'x';
    updatePlayer('x');
});
