import { activePlayer, attack, gameOver, player2, checkGame } from '../logic/controller';
import { resetHunt, addHit } from './cpuHunt';

export function playTurn(cell, { onMessage, onAppend, onRender, onReveal }) {
  if (activePlayer() === player2() || checkGame() === false) return;
  let res = attack(cell);
  if (res.type === 'invalid') return;
  onMessage(`You fire a shot...`);
  setTimeout(() => {
    onRender(activePlayer());
    if (res.type === 'miss') onAppend(` and miss!`);
    if (res.type === 'sink') {
      onAppend(` and sunk the enemy's ship!`);
      onReveal(res.val);
    }
    if (res.type === 'hit') onAppend(` and it's a hit!`);
    if (gameOver(activePlayer())) {
      onMessage(`You win!`);
      return;
    }
  }, 750);
  setTimeout(() => {
    onMessage(`Enemy fires a shot...`);
  }, 2000);
  setTimeout(() => {
    res = attack();
    if (res.type === 'miss') onAppend(` and misses!`);
    if (res.type === 'hit') {
      onAppend(` it's a hit!`);
      addHit(res.val);
    }
    if (res.type === 'sink') {
      onAppend(` and sinks your ship!`);
      resetHunt();
    }
    onRender(activePlayer());
    if (gameOver(activePlayer())) {
      onMessage(`Enemy wins!`);
      return;
    }
  }, 3250);
}
