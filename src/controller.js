import { Ship } from './ships';
import { Player } from './player';

let p1 = new Player(true, true);
let p2 = new Player(false, false);
let p1Ship = null;
let p2Ship = null;
let gameRunning = false;

export function randomBoard() {
  let dir, row, col;
  for (let i = 0; i < 5; i++) {
    if (i == 2) {
      p1Ship = new Ship(3);
      p2Ship = new Ship(3);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p1.board.randomCheck(p1Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p1.board.placeShip(p1Ship, row, col, dir);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p2.board.randomCheck(p2Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p2.board.placeShip(p2Ship, row, col, dir);
    } else if (i > 2) {
      p1Ship = new Ship(i + 1);
      p2Ship = new Ship(i + 1);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p1.board.randomCheck(p1Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p1.board.placeShip(p1Ship, row, col, dir);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p2.board.randomCheck(p2Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p2.board.placeShip(p2Ship, row, col, dir);
    } else {
      p1Ship = new Ship(i + 2);
      p2Ship = new Ship(i + 2);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p1.board.randomCheck(p1Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p1.board.placeShip(p1Ship, row, col, dir);
      dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      while (p2.board.randomCheck(p2Ship, row, col, dir) === false) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
      }
      p2.board.placeShip(p2Ship, row, col, dir);
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

export const checkGame = () => gameRunning;

export function gameOn() {
  gameRunning = true;
}

export function resetBoard() {
  p1.board.reset();
  p2.board.reset();
}
