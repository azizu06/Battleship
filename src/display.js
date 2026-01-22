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
  resetHunt,
  addHit,
  restartGame,
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
      cellMarker(player, point, square);
      if (!player.real) {
        square.addEventListener('click', (e) => {
          const cell = e.currentTarget;
          clickSquare(cell);
        });
      }
      board.appendChild(square);
    }
  }
  return board;
}

function cellMarker(player, point, square) {
  if ((player.real && point?.ship !== undefined) || (!player.real && point?.ship?.sunk))
    square.classList.add('ship');
  if (point?.status === 1) {
    const shot = document.createElement('div');
    shot.classList.add('hit');
    square.appendChild(shot);
  } else if (point?.status === 0) {
    const shot = document.createElement('div');
    shot.classList.add('miss');
    square.appendChild(shot);
  }
}

function clickSquare(cell) {
  const gameText = document.querySelector('.gameText');
  if (activePlayer() === player2() || checkGame() === false) return;
  let res = attack(cell.dataset.id);
  if (res === -1) return;
  gameText.innerText = `You fire a shot...`;
  setTimeout(() => {
    attachBoard(activePlayer());
    if (res.type === 'miss') gameText.innerText += ` and miss!`;
    if (res.type === 'sink') {
      gameText.innerText += ` and sunk the enemy's ship!`;
      revealShip(res.val);
    }
    if (res.type === 'hit') gameText.innerText += ` and it's a hit!`;
    if (gameOver(activePlayer())) {
      gameText.innerText = `You win!`;
      return;
    }
  }, 750);
  setTimeout(() => {
    gameText.innerText = `Enemy fires a shot...`;
  }, 2000);
  setTimeout(() => {
    res = attack();
    if (res.type === 'miss') gameText.innerText += ` and misses!`;
    if (res.type === 'hit') {
      gameText.innerText += ` it's a hit!`;
      addHit(res.val);
    }
    if (res.type === 'sink') {
      gameText.innerText += ` and sinks your ship!`;
      resetHunt();
    }
    attachBoard(activePlayer());
    if (gameOver(activePlayer())) {
      gameText.innerText = `Enemy wins!`;
      return;
    }
  }, 3250);
}

function revealShip(ship) {
  const points = player2().board.findShip(ship);
  const board = document.querySelector('.grid2');
  const squares = points.map((id) => board.querySelector(`div[data-id="${id}"]`));
  squares.forEach((square) => {
    square.classList.add('ship');
  });
}

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
