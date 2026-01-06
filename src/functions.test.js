const { capital, reverse, calc, cipher, analyzeArray } = require('./functions');

test('capitalize', () => {
  expect(capital('hello')).toMatch(/Hello/);
});

test('reverse', () => {
  expect(reverse('hello')).toMatch(/olleh/);
});

test('add', () => {
  expect(calc.add(3, 5)).toBe(8);
});

test('subtract', () => {
  expect(calc.sub(10, 9)).toBe(1);
});

test('multiply', () => {
  expect(calc.mul(10, 10)).toBe(100);
});

test('divide', () => {
  expect(calc.div(50, 5)).toBe(10);
});

test('cipher', () => {
  expect(cipher('xyz', 3)).toMatch(/abc/);
});

test('array match', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
