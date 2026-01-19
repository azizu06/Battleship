export class Board {
  constructor() {
    this.data = {};
    this.squares = 0;
    this.rows = 10;
    this.cols = 10;
  }
  placeShip(ship, row, col, dir) {
    if (dir === 'x') {
      if (!this.checkSquares(ship, row, col, dir)) return 0;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row},${col + i}`;
        this.data[point] = ship;
        this.squares += 1;
      }
    } else {
      if (!this.checkSquares(ship, row, col, dir)) return 0;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row + i},${col}`;
        this.data[point] = ship;
        this.squares += 1;
      }
    }
    return 1;
  }
  getAttack(point) {
    let square = this.data[point];
    if (square !== undefined && square !== 0 && square !== 1) {
      this.squares -= 1;
      this.data[point] = 1;
      square.hit();
      return 1;
    } else if (square === undefined) {
      this.data[point] = 0;
      return 0;
    } else {
      return -1;
    }
  }

  checkSquares(ship, row, col, dir) {
    if (dir === 'x') {
      for (let i = 0; i < ship.length; i++) {
        const point = `${row},${col + i}`;
        const cols = col + i;
        if (this.data[point] !== undefined || cols > this.cols) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const point = `${row + i},${col}`;
        const rows = row + i;
        if (this.data[point] !== undefined || rows > this.rows) return false;
      }
    }
    return true;
  }

  allSunk() {
    if (this.squares === 0) return true;
    return false;
  }

  getSquares() {
    return this.squares;
  }

  getSquare(row, col) {
    const point = `${row},${col}`;
    return this.data[point];
  }
}
