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

const validateRandomNumber = (start, end) => {
  if (start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if (start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }
};

const getRandomNumber = ({ startNumber: start, endNumber: end }) => {
  validateRandomNumber(start, end);

  return Math.floor(Math.random() * (end - start) + start);
};

const getRandomFloat = ({ startNumber: start, endNumber: end, precision }) => {
  validateRandomNumber(start, end);

  return (Math.random() * (end - start) + start).toFixed(precision);
};

coordinates.forEach((coordinate) => {
  getRandomFloat(coordinate);
});

coordinates.forEach((coordinate) => {
  getRandomNumber(coordinate);
});

//Validation

const selectTypeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectQuantityRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

const TYPES_OF_HOUSING = [
  {
    type: 'bungalow',
    minPrice: 0,
  },
  {
    type: 'flat',
    minPrice: 1000,
  },
  {
    type: 'hotel',
    minPrice: 3000,
  },
  {
    type: 'house',
    minPrice: 5000,
  },
  {
    type: 'palace',
    minPrice: 10000,
  },
];

const ROOMS_TO_GUESTS_MAPPER = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

selectTypeHousing.addEventListener('change', () => {
  TYPES_OF_HOUSING.forEach(({ type, minPrice }) => {
    if (selectTypeHousing.value === type) {
      inputPrice.min = minPrice;
    }
  });
});

selectQuantityRoom.addEventListener('change', (evt) => {
  let flag = false;

  for (const quantityPerson of selectCapacity.children) {
    const isAvailableQuantity = ROOMS_TO_GUESTS_MAPPER[evt.target.value].includes(+quantityPerson.value);
    quantityPerson.disabled = !isAvailableQuantity;

    if(!flag && isAvailableQuantity) {
      flag = true;
      quantityPerson.selected = true;
    }

  }
});

selectTimeIn.addEventListener('change', (evt) => {
  selectTimeOut.value = evt.target.value;
});

selectTimeOut.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
});

