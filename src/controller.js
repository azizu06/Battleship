import { Ship } from './ships';
import { Player } from './player';

let p1 = null;
let p2 = null;
let gameRunning = true;

export function buildBoard() {
  p1 = new Player(true, true);
  p2 = new Player(false, false);
  let p1Ship = null;
  let p2Ship = null;
  for (let i = 0; i < 5; i++) {
    if (i == 2) {
      p1Ship = new Ship(3);
      p2Ship = new Ship(3);
      p1.board.placeShip(p1Ship, i, i, 'x');
      p2.board.placeShip(p2Ship, i, i, 'x');
    } else if (i > 2) {
      p1Ship = new Ship(i + 1);
      p2Ship = new Ship(i + 1);
      p1.board.placeShip(p1Ship, i, i, 'x');
      p2.board.placeShip(p2Ship, i, i, 'x');
    } else {
      p1Ship = new Ship(i + 2);
      p2Ship = new Ship(i + 2);
      p1.board.placeShip(p1Ship, i, i, 'x');
      p2.board.placeShip(p2Ship, i, i, 'x');
    }
  }
}

export function attack(point = null) {
  if (point) {
    p2.board.getAttack(point);
    p1.turn = !p1.turn;
    p2.turn = !p2.turn;
    return;
  } else {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const square = `${row},${col}`;
    p1.board.getAttack(square);
    p2.turn = !p2.turn;
    p1.turn = !p1.turn;
  }
}

export const player1 = () => p1;
export const player2 = () => p2;
export function activePlayer() {
  return p1.turn ? p1 : p2;
}

export function gameOver(player) {
  if (player.board.allSunk()) {
    gameRunning = false;
    return true;
  }
}

export const gameOn = () => gameRunning;
