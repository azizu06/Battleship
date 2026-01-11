import { player1, player2, buildBoard } from './controller';

export function renderGrid(player) {
  const board = document.createElement('div');
  board.classList.add('board');
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.id = `${r},${c}`;
      if (player.board.getSquare(r, c) !== undefined) square.innerText = '$';
      board.appendChild(square);
    }
  }
  return board;
}

export function initBoard() {
  const content = document.querySelector('.content');
  const grid = renderGrid(player1());
  content.appendChild(grid);
}

export function renderStart() {
  if (player1().board.getSquares() !== 17) return;
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const row1 = document.createElement('div');
  const row2 = document.createElement('div');
  row1.classList.add('infoRow');
  row2.classList.add('gameRow');
  const gameInfo = document.createElement('h3');
  gameInfo.innerText = `Player 1's turn`;
  row1.appendChild(gameInfo);
  content.appendChild(row1);

  const board1 = document.createElement('div');
  const board2 = document.createElement('div');
  board1.classList.add('gameBoard');
  board2.classList.add('gameBoard');
  const title1 = document.createElement('h2');
  title1.innerText = 'Friendly Waters';
  const title2 = document.createElement('h2');
  title2.innerText = 'Enemy Waters';
  const grid1 = renderGrid(player1());
  const grid2 = renderGrid(player2());
  board1.appendChild(title1);
  board1.appendChild(grid1);
  row2.appendChild(board1);
  board2.appendChild(title2);
  board2.appendChild(grid2);
  row2.appendChild(board2);
  content.appendChild(row2);
}

buildBoard();
initBoard();
renderStart();
