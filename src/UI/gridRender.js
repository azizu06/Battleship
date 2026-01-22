import { activePlayer, attack, gameOver, player2, checkGame } from '../logic/controller';
import { addHit, resetHunt } from '../logic/cpuHunt';

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
  if (res.type === 'invalid') return;
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
