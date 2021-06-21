const selectTypeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectQuantityRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const inputAddres = document.querySelector('#address');

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
  let isSelectSet = false;

  for (const quantityPerson of selectCapacity.children) {
    const isAvailableQuantity = ROOMS_TO_GUESTS_MAPPER[evt.target.value].includes(+quantityPerson.value);
    quantityPerson.disabled = !isAvailableQuantity;

    if (!isSelectSet && isAvailableQuantity) {
      isSelectSet = true;
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

export {TYPES_OF_HOUSING, inputAddres};
