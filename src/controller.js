import { Ship } from './ships';
import { Player } from './player';

let p1 = new Player(true, true);
let p2 = new Player(false, false);
let p1Ship,
  p2Ship = null;
let gameRunning,
  madeStack = false;
let shotSet = new Set();
let curHits,
  targets = [];
let pos = '';
let minC,
  minR = Infinity;
let maxC,
  MaxR = -Infinity;

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
    flipTurn();
    return res;
  } else {
    if (curHits.length > 0) {
      const res = aimBot();
      return res;
    } else {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let square = `${row},${col}`;
      while (!shotSet.has(square)) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        square = `${row},${col}`;
      }
      shotSet.add(square);
      const res = p1.board.getAttack(square);
      flipTurn();
      return res;
    }
  }
}

function aimBot() {
  if (!madeStack) {
    const [r, c] = curHits[0].split(',').map(Number);
    let down = `${r + 1},${c}`;
    let left = `${r},${c - 1}`;
    let up = `${r - 1},${c}`;
    let right = `${r},${c + 1}`;
    targets.push(down);
    targets.push(left);
    targets.push(right);
    targets.push(up);
    madeStack = true;
  }

  if (curHits.length < 2) {
    if (targets.length > 0) {
      while (!p1.board.checkBounds(targets.at(-1)) && shotSet.has(targets.at(-1))) {
        targets.pop();
      }
      shotSet.add(targets.at(-1));
      const res = p1.board.getAttack(targets.at(-1));
      targets.pop();
      flipTurn();
      return res;
    }
  }
  if (curHits.length === 2) pos = findDir();
  if (curHits.length > 1) {
    if (pos === 'H') {
      const r = Number(curHits[0].split(',')[0]);
      minMaxC();
      if (
        p1.board.checkBounds(`${r},${minC - 1}`) &&
        p1.board.getSquare(`${r},${minC - 1}`)?.ship
      ) {
        shotSet.add(`${r},${minC - 1}`);
        const res = p1.board.getAttack(`${r},${minC - 1}`);
        flipTurn();
        return res;
      } else if (
        p1.board.checkBounds(`${r},${minC + 1}`) &&
        p1.board.getSquare(`${r},${minC + 1}`)?.ship
      ) {
        shotSet.add(`${r},${minC + 1}`);
        const res = p1.board.getAttack(`${r},${minC + 1}`);
        flipTurn();
        return res;
      }
    } else if (pos === 'V') {
      const c = Number(curHits[0].split(',')[1]);
      minMaxR();
      if (
        p1.board.checkBounds(`${minR - 1},${c}`) &&
        p1.board.getSquare(`${minR - 1},${c}`)?.ship
      ) {
        shotSet.add(`${minR - 1},${c}`);
        const res = p1.board.getAttack(`${minR - 1},${c}`);
        flipTurn();
        return res;
      } else if (
        p1.board.checkBounds(`${minR + 1},${c}`) &&
        p1.board.getSquare(`${minR + 1},${c}`)?.ship
      ) {
        shotSet.add(`${minR + 1},${c}`);
        const res = p1.board.getAttack(`${minR + 1},${c}`);
        flipTurn();
        return res;
      }
    }
  }
}

function flipTurn() {
  p1.turn = !p1.turn;
  p2.turn = !p2.turn;
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

function findDir() {
  const [r1, c1] = curHits[0].split(',').map(Number);
  const [r2, c2] = curHits[1].split(',').map(Number);
  if (r1 - r2 !== 0) {
    return 'V';
  } else if (c1 - c2 !== 0) {
    return 'H';
  }
}

function minMaxC() {
  for (const hit of curHits) {
    const c = Number(hit.split(',')[1]);
    if (c < minC) minC = c;
  }
  for (const hit of curHits) {
    const c = Number(hit.split(',')[1]);
    if (c > maxC) maxC = c;
  }
}

function minMaxR() {
  for (const hit of curHits) {
    const r = Number(hit.split(',')[0]);
    if (r < minR) minR = r;
  }
  for (const hit of curHits) {
    const r = Number(hit.split(',')[0]);
    if (r > MaxR) MaxR = r;
  }
}

export function resetHunt() {
  (minC, (minR = Infinity));
  (maxC, (MaxR = -Infinity));
  (curHits, (targets = []));
  pos = '';
  madeStack = false;
}

export function addHit(point) {
  curHits.push(point);
}

export function gameOn() {
  gameRunning = true;
}

export function resetBoard() {
  p1.board.reset();
  p2.board.reset();
}
