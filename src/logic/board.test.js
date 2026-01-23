import { Board } from './board';
import { Ship } from './ships';
const s1 = new Ship(4);
const b1 = new Board();
const s2 = new Ship(3);

test('ship coordinate', () => {
  b1.placeShip(s1, 3, 3, 'x');
  expect(b1.getSquares()).toBe(4);
});

test('found ship', () => {
  expect(b1.getSquare(3, 4)).toMatchObject({
    length: 4,
  });
});

test('found empty', () => {
  expect(b1.getSquare(2, 4)).toBe(undefined);
});

test('hit ship', () => {
  const hitSpot = b1.getAttack(3, 3);
  const hitSpot2 = b1.getAttack(3, 3);
  expect(hitSpot2).toBe(-1);
});

test('ship dead', () => {
  for (let i = 0; i < s1.length; i++) {
    b1.getAttack(3, 3 + i);
  }
  expect(b1.allSunk()).toBe(true);
  //   expect(s1.sunk).toBe(true);
});

test('hit water', () => {
  b1.getAttack(2, 3);
  expect(b1.getSquare(2, 3)).toBe(0);
});

test('open space', () => {
  const valid = b1.placeShip(s2, 9, 9, 'x');
  expect(valid).toBe(1);
});
