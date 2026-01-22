import {
  player1,
  player2,
  gameOn,
  randomBoard,
  resetBoard,
  restartGame,
} from '../logic/controller';
import { renderGrid } from './gridRender';

export function initBoard() {
  const content = document.querySelector('.content');
  const startTitle = document.createElement('h2');
  startTitle.innerText = 'Place Your Ship';
  content.append(startTitle);
  const placer = document.createElement('div');
  placer.classList.add('placer');
  const grid = renderGrid(player1());
  const options = document.createElement('div');
  options.classList.add('options');

  const random = document.createElement('button');
  random.innerText = 'Random';
  random.addEventListener('click', () => {
    clearBoard();
    const board = document.querySelector('.board');
    randomBoard();
    const grid = renderGrid(player1());
    board.remove();
    content.insertBefore(grid, content.lastElementChild);
  });
  placer.appendChild(random);

  const reset = document.createElement('button');
  reset.innerText = 'Reset';
  reset.addEventListener('click', clearBoard);
  placer.appendChild(reset);

  const start = document.createElement('button');
  start.innerText = 'Start';
  start.addEventListener('click', () => {
    if (player1().board.getSquares() !== 17) return;
    gameOn();
    renderStart();
  });
  content.appendChild(placer);
  content.appendChild(grid);
  options.appendChild(start);
  content.appendChild(options);
}

function clearBoard() {
  const content = document.querySelector('.content');
  const board = document.querySelector('.board');
  resetBoard();
  const grid = renderGrid(player1());
  board.remove();
  content.insertBefore(grid, content.lastElementChild);
}

function renderStart() {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const row1 = document.createElement('div');
  const row2 = document.createElement('div');
  const row3 = document.createElement('div');
  row1.classList.add('infoRow');
  row2.classList.add('gameRow');
  row3.classList.add('footer');
  const gameInfo = document.createElement('h3');
  gameInfo.classList.add('gameText');
  gameInfo.innerText = `Your turn`;
  row1.appendChild(gameInfo);
  content.appendChild(row1);

  const restart = document.createElement('button');
  restart.innerText = 'Restart';
  restart.addEventListener('click', () => {
    restartGame();
    content.innerHTML = '';
    initBoard();
  });
  row3.appendChild(restart);

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
  grid1.classList.add('grid1');
  grid2.classList.add('grid2');
  board1.appendChild(title1);
  board1.appendChild(grid1);
  row2.appendChild(board1);
  board2.appendChild(title2);
  board2.appendChild(grid2);
  row2.appendChild(board2);
  content.appendChild(row2);
  content.appendChild(row3);
}
