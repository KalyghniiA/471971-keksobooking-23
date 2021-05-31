
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


const validityRandomNumber = (start, end) => {
  if(start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if(start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }
};

const getRandomNumber = ({startNumber: start, endNumber: end}) => {
  validityRandomNumber(start,end);

  return Math.floor(Math.random() * (end - start) + start);
};


const getRandomFloat = ({startNumber: start, endNumber: end, precision}) => {
  validityRandomNumber(start,end);

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
const selectQuantotyRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');


const typesOfHousing = [
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


const roomsDictionary = {
  1: [
    1,
  ],
  2: [
    1,
    2,
  ],
  3: [
    1, 2, 3,
  ],
  100:[
    0,
  ],
};

selectTypeHousing.addEventListener('change', () => {
  typesOfHousing.forEach(({type, minPrice}) => {
    if(selectTypeHousing.value === type) {
      inputPrice.min = minPrice;
    }
  });
});

selectQuantotyRoom.addEventListener('change', (evt) => {
  for(const quantityPerson of selectCapacity.children) {

    quantityPerson.disabled = !roomsDictionary[evt.target.value].includes(+quantityPerson.value);
  }
});


selectTimeIn.addEventListener('change', (evt) => {
  selectTimeOut.value = evt.target.value;
});

selectTimeOut.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
});

