/* eslint-disable id-length */
import { removeMapPin } from './create-popup-mark.js';

const selectFilterTypeHousing = document.querySelector('#housing-type');
const selectFilterPrice = document.querySelector('#housing-price');
const selectFilterRooms = document.querySelector('#housing-rooms');
const selectFilterGuests = document.querySelector('#housing-guests');
const chekboxsHousingFeatures = document.querySelector('#housing-features');

const Default = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  quests: 'any',
};

const getValuePrice = (price) => {
  if(price >= 10000 && price <= 50000) {
    return 'middle';
  }
  if(price < 10000) {
    return 'low';
  }
  if(price > 50000) {
    return 'high';
  }
};

const getValueRooms = (quantityRooms) => {
  if(quantityRooms >= 3) {
    return String(3);
  }
  //console.log(quantityRooms);
  return String(quantityRooms);
};

const getValueGuests = (quantityQuests) => {
  if(quantityQuests >= 2) {
    return String(2);
  }

  return String(quantityQuests);
};

let checkboxArrayChecked = [];

const filterType = (arr) => {
  const newArr = [];
  mainLoop:for(let i = 0; i < arr.length; i++) {

    const {offer: {type, price, rooms, guests, features}} = arr[i];

    featuresLoop:for(let j = 0; j < checkboxArrayChecked.length; j++) {
      if(!checkboxArrayChecked) {break featuresLoop;}
      if(!features || !features.includes(checkboxArrayChecked[j])) {continue mainLoop;}
    }


    if(
      [type, Default.type].includes(selectFilterTypeHousing.value)
    && [getValuePrice(price), Default.price].includes(selectFilterPrice.value)
    && [getValueRooms(rooms), Default.rooms].includes(selectFilterRooms.value)
    && [getValueGuests(guests), Default.quests].includes(selectFilterGuests.value)
    ) {
      newArr.push(arr[i]);
    }

    if(newArr.length === 10) {
      break;
    }
  }
  return newArr;
};


const onChangeCheckbox = (cb) => {
  chekboxsHousingFeatures.addEventListener('change', () => {
    const arr = chekboxsHousingFeatures.querySelectorAll('.map__checkbox');
    checkboxArrayChecked = [];
    arr.forEach((el) => {
      if(el.checked) {
        checkboxArrayChecked.push(el.value);
      }
    });
    removeMapPin();
    cb();
  });
};

const onChangeFilterTypeHousing = (cb) => {
  selectFilterTypeHousing.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const onChangeFilterPrice = (cb) => {
  selectFilterPrice.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const onChangeFilterRooms = (cb) => {
  selectFilterRooms.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const onChangeFilterGuests = (cb) => {
  selectFilterGuests.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

export {filterType, onChangeFilterTypeHousing, onChangeFilterPrice, onChangeFilterRooms, onChangeFilterGuests, onChangeCheckbox};
