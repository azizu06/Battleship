import { Ship } from './ships';
import { Player } from './player';

let p1 = new Player(true, true);
let p2 = new Player(false, false);
let p1Ship = null;
let p2Ship = null;
let gameRunning = false;

export function randomBoard() {
  let pt = {
    dir: '',
    row: 0,
    col: 0,
  };
  for (let i = 0; i < 5; i++) {
    if (i == 2) {
      p1Ship = new Ship(3);
      p2Ship = new Ship(3);
      getPoint(pt);
      while (p1.board.randomCheck(p1Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p1.board.placeShip(p1Ship, pt.row, pt.col, pt.dir);
      getPoint(pt);
      while (p2.board.randomCheck(p2Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p2.board.placeShip(p2Ship, pt.row, pt.col, pt.dir);
    } else if (i > 2) {
      p1Ship = new Ship(i + 1);
      p2Ship = new Ship(i + 1);
      getPoint(pt);
      while (p1.board.randomCheck(p1Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p1.board.placeShip(p1Ship, pt.row, pt.col, pt.dir);
      getPoint(pt);
      while (p2.board.randomCheck(p2Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p2.board.placeShip(p2Ship, pt.row, pt.col, pt.dir);
    } else {
      p1Ship = new Ship(i + 2);
      p2Ship = new Ship(i + 2);
      getPoint(pt);
      while (p1.board.randomCheck(p1Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p1.board.placeShip(p1Ship, pt.row, pt.col, pt.dir);
      getPoint(pt);
      while (p2.board.randomCheck(p2Ship, pt.row, pt.col, pt.dir) === false) {
        getPoint(pt);
      }
      p2.board.placeShip(p2Ship, pt.row, pt.col, pt.dir);
    }
  }
}

function getPoint(point) {
  point.row = Math.floor(Math.random() * 10);
  point.col = Math.floor(Math.random() * 10);
  point.dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
}

export function attack(point = null) {
  if (point) {
    if (p2.board.getSquare(point)?.status === 1 || p2.board.getSquare(point)?.status === 0)
      return -1;
    const res = p2.board.getAttack(point);
    p1.turn = !p1.turn;
    p2.turn = !p2.turn;
    return res;
  } else {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let square = `${row},${col}`;
    while (p1.board.getSquare(square)?.status === 1 || p1.board.getSquare(square)?.status === 0) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      square = `${row},${col}`;
    }
    const res = p1.board.getAttack(square);
    p2.turn = !p2.turn;
    p1.turn = !p1.turn;
    return res;
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
