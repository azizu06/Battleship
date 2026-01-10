import { Ship } from './ships';
export class Board {
  constructor() {
    this.data = {};
    this.squares = 0;
  }
  placeShip(ship, row, col, dir) {
    if (dir === 'x') {
      for (let i = 0; i < ship.length; i++) {
        let point = `${row},${col + i}`;
        this.data[point] = ship;
        this.squares += 1;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        let point = `${row + i},${col}`;
        this.data[point] = ship;
        this.squares += 1;
      }
    }
  }
  getAttack(row, col) {
    let point = `${row},${col}`;
    let square = this.data[point];
    if (square !== undefined && square !== 0 && square !== 1) {
      this.squares -= 1;
      const ship = square;
      square = 1;
      return ship;
    } else if (square === undefined) {
      square = 0;
      return 1;
    } else {
      return 0;
    }
  }

  allSunk() {
    if (this.squares === 0) return true;
    return false;
  }
}
