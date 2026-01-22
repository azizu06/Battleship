import { Ship } from './ships';
import { Player } from './player';

let p1 = new Player(true, true);
let p2 = new Player(false, false);
let gameRunning = false,
  madeStack = false;
let shotSet = new Set();
let curHits = [],
  targets = [];
let pos = '';
let minC = Infinity,
  minR = Infinity;
let maxC = -Infinity,
  MaxR = -Infinity;

export function randomBoard() {
  let pt = {
    dir: '',
    row: 0,
    col: 0,
  };
  const shipSizes = [2, 3, 3, 4, 5];
  for (const len of shipSizes) {
    placeRandom(len, pt);
  }
}

function placeRandom(len, pt) {
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
      if (res !== -1 && res !== undefined) return res;
      const res2 = shootRandom();
      return res2;
    } else {
      const res = shootRandom();
      return res;
    }
  }
}

function shootRandom() {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  let square = `${row},${col}`;
  while (shotSet.has(square)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    square = `${row},${col}`;
  }
  return takeShot(square);
}

function makeTargets() {
  const [r, c] = curHits[0].split(',').map(Number);
  targets.push(`${r + 1},${c}`);
  targets.push(`${r},${c - 1}`);
  targets.push(`${r},${c + 1}`);
  targets.push(`${r - 1},${c}`);
  madeStack = true;
}

function takeShot(point) {
  shotSet.add(point);
  const res = p1.board.getAttack(point);
  flipTurn();
  return res;
}

function nextTarget() {
  while (targets.length && !validTarget(targets.at(-1))) {
    targets.pop();
  }
  return targets.length ? targets.at(-1) : null;
}

function aimBot() {
  if (!madeStack) makeTargets();

  if (curHits.length < 2) {
    const target = nextTarget();
    if (!target) return -1;
    targets.pop();
    return takeShot(target);
  }
  if (curHits.length === 2) pos = findDir();
  if (curHits.length > 1) {
    if (pos === 'H') return shootHorizontal();
    if (pos === 'V') return shootVertical();
    return -1;
  }
}

function shootHorizontal() {
  const r = Number(curHits[0].split(',')[0]);
  minMaxC();
  if (validTarget(`${r},${minC - 1}`)) return takeShot(`${r},${minC - 1}`);
  if (validTarget(`${r},${maxC + 1}`)) return takeShot(`${r},${maxC + 1}`);
  resetHunt();
  return -1;
}

function shootVertical() {
  const c = Number(curHits[0].split(',')[1]);
  minMaxR();
  if (validTarget(`${minR - 1},${c}`)) return takeShot(`${minR - 1},${c}`);
  if (validTarget(`${MaxR + 1},${c}`)) return takeShot(`${MaxR + 1},${c}`);
  resetHunt();
  return -1;
}

function validTarget(point) {
  return point && p1.board.checkBounds(point) && !shotSet.has(point);
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
  minC = Infinity;
  minR = Infinity;
  maxC = -Infinity;
  MaxR = -Infinity;
  curHits = [];
  targets = [];
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

export function restartGame() {
  resetHunt();
  resetBoard();
  shotSet = new Set();
  gameRunning = false;
  p1.turn = true;
  p2.turn = false;
}
