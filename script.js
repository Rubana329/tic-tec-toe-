const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const twoPlayerBtn = document.getElementById('twoPlayer');
const vsComputerBtn = document.getElementById('vsComputer');

let cells;
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
  }
  cells = document.querySelectorAll('.cell');
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    statusDisplay.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }
  if (isDraw()) {
    statusDisplay.textContent = `It's a Draw! 🤝`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `${currentPlayer}'s Turn`;

  if (vsComputer && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    statusDisplay.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }
  if (isDraw()) {
    statusDisplay.textContent = `It's a Draw! 🤝`;
    gameActive = false;
    return;
  }
  currentPlayer = 'X';
  statusDisplay.textContent = `${currentPlayer}'s Turn`;
}

function checkWin(player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winCombos.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function startGame() {
  createBoard();
  statusDisplay.textContent = `${currentPlayer}'s Turn`;
  gameActive = true;
  cells.forEach(cell => cell.addEventListener('click', handleClick));
}

restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  startGame();
});

twoPlayerBtn.addEventListener('click', () => {
  vsComputer = false;
  currentPlayer = 'X';
  startGame();
});

vsComputerBtn.addEventListener('click', () => {
  vsComputer = true;
  currentPlayer = 'X';
  startGame();
});

// Initialize the board by default
createBoard();
