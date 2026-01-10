import { Ship } from './ships';
import { Player } from './player';
import { renderGrid } from './display';

export function initBoard() {
  const p1 = new Player(true);
  const p2 = new Player(false);
  const p1Ships = [];
  const p2Ships = [];
  for (let i = 0; i < 5; i++) {
    if (i == 2) {
      p1Ships[i] = new Ship(3);
      p2Ships[i] = new Ship(3);
      p1.board.placeShip(p1Ships[i], i, i, 'x');
      p2.board.placeShip(p2Ships[i], i, i, 'x');
    } else if (i > 2) {
      p1Ships[i] = new Ship(i + 1);
      p2Ships[i] = new Ship(i + 1);
      p1.board.placeShip(p1Ships[i], i, i, 'x');
      p2.board.placeShip(p2Ships[i], i, i, 'x');
    } else {
      p1Ships[i] = new Ship(i + 2);
      p2Ships[i] = new Ship(i + 2);
      p1.board.placeShip(p1Ships[i], i, i, 'x');
      p2.board.placeShip(p2Ships[i], i, i, 'x');
    }
  }
  renderGrid(p1);
}
