import { playTurn } from '../logic/turnFlow';
import { setGrid, setText, appendText, showShip } from './display';

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
          const cell = e.currentTarget.dataset.id;
          playTurn(cell, {
            onMessage: setText,
            onAppend: appendText,
            onRender: setGrid,
            onReveal: showShip,
          });
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
