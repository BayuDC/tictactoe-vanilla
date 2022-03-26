const tiles = document.getElementById('game').children;
const state = document.getElementById('state');
const btnReset = document.getElementById('btn-reset');

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
}

[...tiles].forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (tile.classList.contains('x') || tile.classList.contains('o')) return;

        updateBoard(tile, index);
        updatePlayer();
    });
});
btnReset.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    [...tiles].forEach(tile => {
        tile.setAttribute('class', 'tile');
        tile.textContent = '';
    });

    currentPlayer = 'x';
    updatePlayer('x');
});
