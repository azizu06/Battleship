import { player1, flipTurn } from './controller';

let madeStack = false;
let shotSet = new Set();
let curHits = [],
  targets = [];
let pos = '';
let minC = Infinity,
  minR = Infinity;
let maxC = -Infinity,
  MaxR = -Infinity;

export function shootRandom() {
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

function takeShot(point) {
  shotSet.add(point);
  const res = player1().board.getAttack(point);
  flipTurn();
  return res;
}

function makeTargets() {
  const [r, c] = curHits[0].split(',').map(Number);
  targets.push(`${r + 1},${c}`);
  targets.push(`${r},${c - 1}`);
  targets.push(`${r},${c + 1}`);
  targets.push(`${r - 1},${c}`);
  madeStack = true;
}

function nextTarget() {
  while (targets.length && !validTarget(targets.at(-1))) {
    targets.pop();
  }
  return targets.length ? targets.at(-1) : null;
}

export function aimBot() {
  if (!madeStack) makeTargets();

  if (curHits.length < 2) {
    const target = nextTarget();
    if (!target) return { type: 'invalid' };
    targets.pop();
    return takeShot(target);
  }
  if (curHits.length === 2) pos = findDir();
  if (curHits.length > 1) {
    if (pos === 'H') return shootHorizontal();
    if (pos === 'V') return shootVertical();
    return { type: 'invalid' };
  }
}

function shootHorizontal() {
  const r = Number(curHits[0].split(',')[0]);
  minMaxC();
  if (validTarget(`${r},${minC - 1}`)) return takeShot(`${r},${minC - 1}`);
  if (validTarget(`${r},${maxC + 1}`)) return takeShot(`${r},${maxC + 1}`);
  resetHunt();
  return { type: 'invalid' };
}

function shootVertical() {
  const c = Number(curHits[0].split(',')[1]);
  minMaxR();
  if (validTarget(`${minR - 1},${c}`)) return takeShot(`${minR - 1},${c}`);
  if (validTarget(`${MaxR + 1},${c}`)) return takeShot(`${MaxR + 1},${c}`);
  resetHunt();
  return { type: 'invalid' };
}

function validTarget(point) {
  return point && player1().board.checkBounds(point) && !shotSet.has(point);
}

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

export function resetShots() {
  shotSet = new Set();
}

export const currentHits = () => curHits;
