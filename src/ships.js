export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.sunk) this.hits += 1;
    this.isSunk();
  }

  hp() {
    return this.length - this.hits;
  }

  isSunk() {
    if (this.length === this.hits) this.sunk = true;
  }

  sunk() {
    return this.sunk;
  }
}
