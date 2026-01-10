export function renderGrid(p1) {
  const board = document.querySelector('.board');
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.id = `${r},${c}`;
      if (p1.board.getSquare(r, c) !== undefined) square.innerText = '$';
      board.appendChild(square);
    }
  }
}
