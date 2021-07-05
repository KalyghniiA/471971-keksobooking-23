import { userMarker, USER_MARKER_LAT, USER_MARKER_LNG } from './map.js';

const selectTypeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectQuantityRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const inputAddress = document.querySelector('#address');


const formUser = {
  form: document.querySelector('.ad-form'),
  childrens: [...document.querySelectorAll('.ad-form fieldset')],
};

const formFilters ={
  form: document.querySelector('.map__filters'),
  childrens: [...document.querySelectorAll('.map__filters fieldset,select')],
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

const toggleVisibleForm = ({form, childrens}, flaq) => {

  if(flaq){
    form.classList.add('ad-form--disabled');
    childrens.forEach((children) => children.disabled = !children.disabled);
  } else {
    form.classList.remove('ad-form--disabled');
    childrens.forEach((children) => children.disabled = !children.disabled);
  }
};

const formReset = () => {
  formUser.form.reset();
  inputAddress.value = `${USER_MARKER_LAT}, ${USER_MARKER_LNG}`;
  userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
};


toggleVisibleForm(formUser, disabledFormParameter);
toggleVisibleForm(formFilters, disabledFormParameter);

export {TYPES_OF_HOUSING, inputAddress, toggleVisibleForm, formUser, formFilters, formReset};
