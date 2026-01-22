export class Board {
  constructor() {
    this.data = {};
    this.squares = 0;
    this.rows = 9;
    this.cols = 9;
  }

  placeShip(ship, row, col, dir) {
    if (dir === 'x') {
      if (!this.checkSquares(ship, row, col, dir)) return 0;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row},${col + i}`;
        this.data[point] = {
          ship: ship,
          status: -1,
        };
        this.squares += 1;
      }
    } else {
      if (!this.checkSquares(ship, row, col, dir)) return 0;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row + i},${col}`;
        this.data[point] = {
          ship: ship,
          status: -1,
        };
        this.squares += 1;
      }
    }
    return 1;
  }

  getAttack(point) {
    let square = this.data[point];
    if (square?.ship !== undefined && square?.status !== 0 && square?.status !== 1) {
      this.squares -= 1;
      this.data[point].status = 1;
      square.ship.hit();
      if (square.ship.dead()) return { type: 'sink', val: square.ship };
      return { type: 'hit', val: point };
    } else if (square === undefined) {
      this.data[point] = { status: 0 };
      return { type: 'miss' };
    }
  }

  checkSquares(ship, row, col, dir) {
    if (dir === 'x') {
      for (let i = 0; i < ship.length; i++) {
        const point = `${row},${col + i}`;
        const cols = col + i;
        if (this.data[point]?.ship !== undefined || cols > this.cols) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const point = `${row + i},${col}`;
        const rows = row + i;
        if (this.data[point]?.ship !== undefined || rows > this.rows) return false;
      }
    }
    return true;
  }

  randomCheck(ship, row, col, dir) {
    let invalidC1, invalidC2, invalidR1, invalidR2;
    if (dir === 'x') {
      for (let i = 0; i < ship.length; i++) {
        if (i === 0) {
          if (col - 1 >= 0) invalidC1 = `${row},${col - 1}`;
          if (row + 1 < this.rows) invalidR1 = `${row + 1},${col}`;
          if (row - 1 >= 0) invalidR2 = `${row + 1},${col}`;
          if (
            (invalidC1 && this.data[invalidC1]?.ship !== undefined) ||
            (invalidR1 && this.data[invalidR1]?.ship !== undefined) ||
            (invalidR2 && this.data[invalidR2]?.ship !== undefined)
          )
            return false;
        } else if (i === ship.length - 1) {
          if (col + 1 + i < this.cols) invalidC1 = `${row},${col + 1 + i}`;
          if (row + 1 < this.rows) invalidR1 = `${row + 1},${col + i}`;
          if (row - 1 >= 0) invalidR2 = `${row - 1},${col + i}`;
          if (
            (invalidC1 && this.data[invalidC1]?.ship !== undefined) ||
            (invalidR1 && this.data[invalidR1]?.ship !== undefined) ||
            (invalidR2 && this.data[invalidR2]?.ship !== undefined)
          )
            return false;
        } else {
          if (row + 1 < this.rows) invalidR1 = `${row + 1},${col + i}`;
          if (row - 1 >= 0) invalidR2 = `${row - 1},${col + i}`;
          if (
            (invalidR1 && this.data[invalidR1]?.ship !== undefined) ||
            (invalidR2 && this.data[invalidR2]?.ship !== undefined)
          )
            return false;
        }
        const point = `${row},${col + i}`;
        const cols = col + i;
        if (this.data[point]?.ship !== undefined || cols > this.cols) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (i === 0) {
          if (col - 1 >= 0) invalidC1 = `${row},${col - 1}`;
          if (col + 1 < this.cols) invalidC2 = `${row},${col + 1}`;
          if (row - 1 >= 0) invalidR1 = `${row - 1},${col}`;
          if (
            (invalidC1 && this.data[invalidC1]?.ship !== undefined) ||
            (invalidR1 && this.data[invalidR1]?.ship !== undefined) ||
            (invalidC2 && this.data[invalidC2]?.ship !== undefined)
          )
            return false;
        } else if (i === ship.length - 1) {
          if (col - 1 >= 0) invalidC1 = `${row + i},${col - 1}`;
          if (col + 1 < this.cols) invalidC2 = `${row + i},${col + 1}`;
          if (row + 1 + i < this.rows) invalidR1 = `${row + 1 + i},${col}`;
          if (
            (invalidC1 && this.data[invalidC1]?.ship !== undefined) ||
            (invalidR1 && this.data[invalidR1]?.ship !== undefined) ||
            (invalidC2 && this.data[invalidC2]?.ship !== undefined)
          )
            return false;
        } else {
          if (col - 1 >= 0) invalidC1 = `${row + i},${col - 1}`;
          if (col + 1 < this.cols) invalidC2 = `${row + i},${col + 1}`;
          if (
            (invalidC1 && this.data[invalidC1]?.ship !== undefined) ||
            (invalidC2 && this.data[invalidC2]?.ship !== undefined)
          )
            return false;
        }
        const point = `${row + i},${col}`;
        const rows = row + i;
        if (this.data[point]?.ship !== undefined || rows > this.rows) return false;
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

  getSquare(point) {
    return this.data[point];
  }

  reset() {
    this.data = {};
    this.squares = 0;
  }

  checkBounds(point) {
    const [r, c] = point.split(',').map(Number);
    if (r > this.rows || r < 0) return 0;
    if (c > this.cols || c < 0) return 0;
    return 1;
  }

  findShip(ship) {
    const points = Object.keys(this.data).filter((point) => this.data[point].ship === ship);
    return points;
  }
}
