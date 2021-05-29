
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


const getRandomNumber = ({startNumber = 0, endNumber = 1, symbolsAfterComma = 1}) => {
  if(startNumber > endNumber) {
    return ReferenceError('Начальное число больше конечного');
  }

  if(startNumber < 0 || endNumber < 0) {
    return ReferenceError('Числа должны быть положительными');
  }

  return (Math.random() * (endNumber - startNumber) + startNumber).toFixed(symbolsAfterComma);
};



coordinates.forEach((el) => {
  getRandomNumber(el);
});
