import { onResetForm } from './form.js';


const selectTypeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectQuantityRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const inputAddress = document.querySelector('#address');
const buttonReset = document.querySelector('.ad-form__reset');

const announcementForm = {
  form: document.querySelector('.ad-form'),
  children: [...document.querySelectorAll('.ad-form fieldset')],
};

const formFilters ={
  form: document.querySelector('.map__filters'),
  children: [...document.querySelectorAll('.map__filters fieldset,select')],
};

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

const disabledFormParameter = true;

selectTypeHousing.addEventListener('change', () => {
  TYPES_OF_HOUSING.forEach(({ type, minPrice }) => {
    if (selectTypeHousing.value === type) {
      inputPrice.min = minPrice;
      inputPrice.placeholder = minPrice;
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

const toggleVisibleForm = ({form, children}, shouldDisable) => {
  if (shouldDisable) {
    form.classList.add('ad-form--disabled');
    children.forEach((child) => child.disabled = !child.disabled);
  } else {
    form.classList.remove('ad-form--disabled');
    children.forEach((child) => child.disabled = !child.disabled);
  }
};

toggleVisibleForm(announcementForm, disabledFormParameter);
toggleVisibleForm(formFilters, disabledFormParameter);

const setPressReset = (cb) => {
  buttonReset.addEventListener('click', () => {
    onResetForm();
    cb();
  });

};

export {TYPES_OF_HOUSING, inputAddress, toggleVisibleForm, announcementForm, formFilters, inputPrice, setPressReset};
