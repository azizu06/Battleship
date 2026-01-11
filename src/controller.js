import { Ship } from './ships';
import { Player } from './player';

let p1 = null;
let p2 = null;

export function startGame() {
  p1 = new Player(true);
  p2 = new Player(false);
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

export const player1 = () => p1;

export const player2 = () => p2;
