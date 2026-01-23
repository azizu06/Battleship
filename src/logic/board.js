export class Board {
  constructor() {
    this.data = {};
    this.squares = 0;
    this.rows = 9;
    this.cols = 9;
  }

  placeShip(ship, row, col, dir) {
    if (dir === 'x') {
      if (!this.checkSquares(ship, row, col, dir)) return false;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row},${col + i}`;
        this.data[point] = {
          ship: ship,
          status: -1,
        };
        this.squares += 1;
      }
    } else {
      if (!this.checkSquares(ship, row, col, dir)) return false;
      for (let i = 0; i < ship.length; i++) {
        const point = `${row + i},${col}`;
        this.data[point] = {
          ship: ship,
          status: -1,
        };
        this.squares += 1;
      }
    }
    return true;
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
    } else {
      return { type: 'invalid' };
    }
  }

  spotTaken(pts) {
    for (const pt of pts) {
      if (pt && this.data[pt]?.ship !== undefined) return true;
    }
    return false;
  }

  pushIfValid(list, r, c) {
    if (r < 0 || r > this.rows || c < 0 || c > this.cols) return;
    list.push(`${r},${c}`);
  }

  randomCheck(ship, row, col, dir) {
    if (dir === 'x') {
      for (let i = 0; i < ship.length; i++) {
        const invalidPts = [];
        if (i === 0) {
          this.pushIfValid(invalidPts, row, col - 1);
          this.pushIfValid(invalidPts, row + 1, col);
          this.pushIfValid(invalidPts, row - 1, col);
        } else if (i === ship.length - 1) {
          this.pushIfValid(invalidPts, row, col + 1 + i);
          this.pushIfValid(invalidPts, row + 1, col + i);
          this.pushIfValid(invalidPts, row - 1, col + i);
        } else {
          this.pushIfValid(invalidPts, row + 1, col + i);
          this.pushIfValid(invalidPts, row - 1, col + i);
        }
        this.pushIfValid(invalidPts, row, col + i);
        if (this.spotTaken(invalidPts)) return false;
      }
    } else if (dir === 'y') {
      for (let i = 0; i < ship.length; i++) {
        const invalidPts = [];
        if (i === 0) {
          this.pushIfValid(invalidPts, row, col - 1);
          this.pushIfValid(invalidPts, row, col + 1);
          this.pushIfValid(invalidPts, row - 1, col);
        } else if (i === ship.length - 1) {
          this.pushIfValid(invalidPts, row + i, col - 1);
          this.pushIfValid(invalidPts, row + i, col + 1);
          this.pushIfValid(invalidPts, row + 1 + i, col);
        } else {
          this.pushIfValid(invalidPts, row + i, col - 1);
          this.pushIfValid(invalidPts, row + i, col + 1);
        }
        this.pushIfValid(invalidPts, row + i, col);
        if (this.spotTaken(invalidPts)) return false;
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
