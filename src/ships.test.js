import { Ship } from './ships';

test('ship is dead', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.sunk).toBe(true);
});

test('ship is hit', () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  expect(ship.hp()).toBe(2);
});
