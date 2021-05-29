
const coordinates = [
  {
    startNumber: 0,
    endNumber: 3,
    precision: 1,
  },
  {
    startNumber: 3,
    endNumber: 5,
    precision: 2,
  },
  {
    startNumber: 1,
    endNumber: 5,
    precision: 4,
  },
];


const getRandomNumber = ({startNumber: start, endNumber: end}) => {
  if(start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if(start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }

  return Math.floor(Math.random() * (end - start) + start);
};


const getRandomFloat = ({startNumber: start, endNumber: end, precision}) => {
  if(start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if(start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }

  return (Math.random() * (end - start) + start).toFixed(precision);
};


coordinates.forEach((coordinate) => {
  getRandomFloat(coordinate);
});

coordinates.forEach((coordinate) => {
  getRandomNumber(coordinate);
});
