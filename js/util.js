const validateRandomNumber = (start, end) => {
  if (start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if (start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }
};

const getRandomNumber = (start, end) => {
  validateRandomNumber(start, end);

  return Math.floor(Math.random() * (end - start) + start);
};

const getRandomFloat = (start, end, precision) => {
  validateRandomNumber(start, end);

  return (Math.random() * (end - start) + start).toFixed(precision);
};

export { getRandomFloat, getRandomNumber };
