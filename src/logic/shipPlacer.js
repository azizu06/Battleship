import { Ship } from '../ships';
import { player1, player2 } from './controller';

export function placeRandom(len, pt) {
  const p1Ship = new Ship(len);
  const p2Ship = new Ship(len);
  getPoint(pt);
  while (player1().board.randomCheck(p1Ship, pt.row, pt.col, pt.dir) === false) {
    getPoint(pt);
  }
  player1().board.placeShip(p1Ship, pt.row, pt.col, pt.dir);
  getPoint(pt);
  while (player2().board.randomCheck(p2Ship, pt.row, pt.col, pt.dir) === false) {
    getPoint(pt);
  }
  player2().board.placeShip(p2Ship, pt.row, pt.col, pt.dir);
}

function getPoint(point) {
  point.row = Math.floor(Math.random() * 10);
  point.col = Math.floor(Math.random() * 10);
  point.dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
}
