import { Ship } from '../ships';

export function placeRandom(len, pt, p1, p2) {
  const p1Ship = new Ship(len);
  const p2Ship = new Ship(len);
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

function getPoint(point) {
  point.row = Math.floor(Math.random() * 10);
  point.col = Math.floor(Math.random() * 10);
  point.dir = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
}
