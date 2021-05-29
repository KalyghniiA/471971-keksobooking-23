
const coordinates = [
  {
    startNumber: 0,
    endNumber: 3,
    symbolsAfterComma: 1,
  },
  {
    startNumber: 3,
    endNumber: 5,
    symbolsAfterComma: 2,
  },
  {
    startNumber: 1,
    endNumber: 5,
    symbolsAfterComma: 4,
  },
];


const getRandomNumber = ({startNumber: start = 0, endNumber: end = 0}) => {
  if(start > end) {
    return ReferenceError('Начальное число больше конечного');
  }

  if(start < 0 || end < 0) {
    return ReferenceError('Числа должны быть положительными');
  }

  return Math.floor(Math.random() * (end - start) + start);
};


const getRandomNumberWithDot = ({startNumber: start = 0, endNumber: end = 1, symbolsAfterComma = 1}) => {
  if(start > end) {
    return ReferenceError('Начальное число больше конечного');
  }

  if(start < 0 || end < 0) {
    return ReferenceError('Числа должны быть положительными');
  }

  return (Math.random() * (end - start) + start).toFixed(symbolsAfterComma);
};


coordinates.forEach((el) => {
  getRandomNumberWithDot(el);
});

coordinates.forEach((el) => {
  getRandomNumber(el);
});
