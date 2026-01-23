import { Player } from './player';
import { aimBot, resetShots, shootRandom, resetHunt, currentHits } from './cpuHunt';
import { placeRandom } from './shipPlacer';

let p1 = new Player(true, true);
let p2 = new Player(false, false);
let gameRunning = false;

export function randomBoard() {
  let pt = {
    dir: '',
    row: 0,
    col: 0,
  };
  const shipSizes = [2, 3, 3, 4, 5];
  for (const len of shipSizes) {
    placeRandom(len, pt, player1(), player2());
  }
}

export function attack(point = null) {
  if (point) {
    if (p2.board.getSquare(point)?.status === 1 || p2.board.getSquare(point)?.status === 0)
      return { type: 'invalid' };
    const res = p2.board.getAttack(point);
    flipTurn();
    return res;
  } else {
    const ctx = { board: player1().board, flipTurn };
    if (currentHits().length > 0) {
      const res = aimBot(ctx);
      if (res.type !== 'invalid') return res;
    }
    return shootRandom(ctx);
  }
}

export function flipTurn() {
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
  resetShots();
  gameRunning = false;
  p1.turn = true;
  p2.turn = false;
}
