document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const messageElement = document.getElementById('message');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        checkResult();
        switchPlayer();
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.innerText = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            messageElement.innerText = 'Draw!';
            isGameActive = false;
            return;
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.innerText = '');
        messageElement.innerText = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
