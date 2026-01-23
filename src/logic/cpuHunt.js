let madeStack = false;
let shotSet = new Set();
let curHits = [],
  targets = [];
let pos = '';
let minC = Infinity,
  minR = Infinity;
let maxC = -Infinity,
  maxR = -Infinity;

export function shootRandom(ctx) {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  let square = `${row},${col}`;
  while (shotSet.has(square)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    square = `${row},${col}`;
  }
  return takeShot(square, ctx);
}
function makeTargets() {
  const [r, c] = curHits[0].split(',').map(Number);
  targets.push(`${r + 1},${c}`);
  targets.push(`${r},${c - 1}`);
  targets.push(`${r},${c + 1}`);
  targets.push(`${r - 1},${c}`);
  madeStack = true;
}

function nextTarget(board) {
  while (targets.length && !validTarget(targets.at(-1), board)) {
    targets.pop();
  }
  return targets.length ? targets.at(-1) : null;
}

export function aimBot(ctx) {
  if (!madeStack) makeTargets();

  if (curHits.length < 2) {
    const target = nextTarget(ctx.board);
    if (!target) return { type: 'invalid' };
    targets.pop();
    return takeShot(target, ctx);
  }
  if (curHits.length === 2) pos = findDir();
  if (curHits.length > 1) {
    if (pos === 'H') return shootHorizontal(ctx);
    if (pos === 'V') return shootVertical(ctx);
    return { type: 'invalid' };
  }
}

function shootHorizontal(ctx) {
  const r = Number(curHits[0].split(',')[0]);
  minMaxC();
  if (validTarget(`${r},${minC - 1}`, ctx.board)) return takeShot(`${r},${minC - 1}`, ctx);
  if (validTarget(`${r},${maxC + 1}`, ctx.board)) return takeShot(`${r},${maxC + 1}`, ctx);
  resetHunt();
  return { type: 'invalid' };
}

function shootVertical(ctx) {
  const c = Number(curHits[0].split(',')[1]);
  minMaxR();
  if (validTarget(`${minR - 1},${c}`, ctx.board)) return takeShot(`${minR - 1},${c}`, ctx);
  if (validTarget(`${maxR + 1},${c}`, ctx.board)) return takeShot(`${maxR + 1},${c}`, ctx);
  resetHunt();
  return { type: 'invalid' };
}

function validTarget(point, board) {
  return point && board.checkBounds(point) && !shotSet.has(point);
}

function takeShot(point, ctx) {
  shotSet.add(point);
  const res = ctx.board.getAttack(point);
  ctx.flipTurn();
  return res;
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
    if (r > maxR) maxR = r;
  }
}

export function resetHunt() {
  minC = Infinity;
  minR = Infinity;
  maxC = -Infinity;
  maxR = -Infinity;
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
