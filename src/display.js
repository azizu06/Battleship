import {
  player1,
  player2,
  attack,
  activePlayer,
  gameOver,
  gameOn,
  randomBoard,
  checkGame,
  resetBoard,
} from './controller';

export function renderGrid(player) {
  const board = document.createElement('div');
  board.classList.add('board');
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.id = `${r},${c}`;
      const point = player.board.getSquare(`${r},${c}`);
      if (point !== undefined && player.real && point !== 1 && point !== 0) {
        square.innerText = '$';
      } else if (point === 1) {
        const shot = document.createElement('div');
        shot.classList.add('hit');
        square.appendChild(shot);
      } else if (point === 0) {
        const shot = document.createElement('div');
        shot.classList.add('miss');
        square.appendChild(shot);
      }
      if (!player.real) {
        square.addEventListener('click', (e) => {
          const gameText = document.querySelector('.gameText');
          if (activePlayer() === player2() || checkGame() === false) return;
          let res = attack(e.target.dataset.id);
          gameText.innerText = `You fire a shot...`;
          setTimeout(() => {
            attachBoard(activePlayer());
            if (res === 0) {
              gameText.innerText += ` and miss!`;
            } else {
              gameText.innerText += ` it's a hit!`;
            }
            if (gameOver(activePlayer())) {
              gameText.innerText = `You win!`;
              return;
            }
          }, 1000);
          setTimeout(() => {
            gameText.innerText = `Enemy fires a shot...`;
          }, 2250);
          setTimeout(() => {
            res = attack();
            if (res === 0) {
              gameText.innerText += ` and misses!`;
            } else {
              gameText.innerText += ` it's a hit!`;
            }
            attachBoard(activePlayer());
            if (gameOver(activePlayer())) {
              gameText.innerText = `Enemy wins!`;
              return;
            }
          }, 3500);
        });
      }
      board.appendChild(square);
    }
  }
  return board;
}

export function initBoard() {
  const content = document.querySelector('.content');
  const grid = renderGrid(player1());
  content.appendChild(grid);
  const options = document.createElement('div');
  options.classList.add('options');

  const random = document.createElement('button');
  random.innerText = 'Random';
  let isRunning = false;
  random.addEventListener('click', async () => {
    if (isRunning) return;
    clearBoard();
    const board = document.querySelector('.board');
    isRunning = true;
    await randomBoard();
    const grid = renderGrid(player1());
    board.remove();
    content.insertBefore(grid, content.lastElementChild);
    isRunning = false;
  });
  options.appendChild(random);

  const reset = document.createElement('button');
  reset.innerText = 'Reset';
  reset.addEventListener('click', clearBoard);
  options.appendChild(reset);

  const start = document.createElement('button');
  start.innerText = 'Start';
  start.addEventListener('click', () => {
    if (player1().board.getSquares() !== 17) return;
    gameOn();
    renderStart();
  });
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

function attachBoard(player) {
  if (player.real) {
    const board = document.querySelector('.grid1');
    board.innerHTML = '';
    const grid = renderGrid(player);
    board.appendChild(grid);
  } else {
    const board = document.querySelector('.grid2');
    board.innerHTML = '';
    const grid = renderGrid(player);
    board.appendChild(grid);
  }
}

export function renderStart() {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const row1 = document.createElement('div');
  const row2 = document.createElement('div');
  row1.classList.add('infoRow');
  row2.classList.add('gameRow');
  const gameInfo = document.createElement('h3');
  gameInfo.classList.add('gameText');
  gameInfo.innerText = `Your turn`;
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
  grid1.classList.add('grid1');
  grid2.classList.add('grid2');
  board1.appendChild(title1);
  board1.appendChild(grid1);
  row2.appendChild(board1);
  board2.appendChild(title2);
  board2.appendChild(grid2);
  row2.appendChild(board2);
  content.appendChild(row2);
}

initBoard();
