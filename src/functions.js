function capital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  return str.split('').reverse().join('');
}

const calc = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
  mul(a, b) {
    return a * b;
  },
  div(a, b) {
    return a / b;
  },
};

function cipher(str, shift) {
  const a = 'a'.charCodeAt(0);
  const z = 'z'.charCodeAt(0);
  const A = 'A'.charCodeAt(0);
  const Z = 'Z'.charCodeAt(0);
  return str
    .split('')
    .map((char) => {
      const cur = char.charCodeAt(0);
      if (cur >= a && cur <= z) {
        return String.fromCharCode(((cur - a + shift) % 26) + a);
      } else if (cur >= A && cur <= Z) {
        return String.fromCharCode(((cur - A + shift) % 26) + A);
      } else {
        return char;
      }
    })
    .join('');
}

function analyzeArray(arr) {
  const obj = {
    average: arr.reduce((sum, num) => sum + num, 0) / arr.length,
    min: arr.reduce((a, b) => (a > b ? b : a)),
    max: arr.reduce((a, b) => (a > b ? a : b)),
    length: arr.length,
  };
  return obj;
}

module.exports = { capital, reverse, calc, cipher, analyzeArray };
