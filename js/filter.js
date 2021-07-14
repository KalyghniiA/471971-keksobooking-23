/* eslint-disable id-length */
import { removeMapPin } from './create-popup-mark.js';

const selectFilterTypeHousing = document.querySelector('#housing-type');
const selectFilterPrice = document.querySelector('#housing-price');
const selectFilterRooms = document.querySelector('#housing-rooms');
const selectFilterGuests = document.querySelector('#housing-guests');
const chekboxsHousingFeatures = document.querySelector('#housing-features');
const MAX_LENGTH_PINS_ARRAY = 10;
const Default = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  quests: 'any',
};

const getPriceValue = (price) => {
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

const getRoomsValue = (quantityRooms) => {
  if(quantityRooms >= 3) {
    return String(3);
  }
  //console.log(quantityRooms);
  return String(quantityRooms);
};

const getGuestsValue = (quantityQuests) => {
  if(quantityQuests >= 2) {
    return String(2);
  }

  return String(quantityQuests);
};

const filterPins = (arr) => {
  const copiedPins = [];
  const checkboxArrayChecked = [];
  chekboxsHousingFeatures.querySelectorAll('.map__checkbox').forEach((el) => {
    if(el.checked) {
      checkboxArrayChecked.push(el.value);
    }
  });

  mainLoop:for(let i = 0; i < arr.length; i++) {

    const {offer: {type, price, rooms, guests, features}} = arr[i];

    featuresLoop:for(let j = 0; j < checkboxArrayChecked.length; j++) {
      if(!checkboxArrayChecked) {
        break featuresLoop;
      }
      if(!features
        || !features.includes(checkboxArrayChecked[j])) {
        continue mainLoop;
      }
    }


    if(
      [type, Default.type].includes(selectFilterTypeHousing.value)
    && [getPriceValue(price), Default.price].includes(selectFilterPrice.value)
    && [getRoomsValue(rooms), Default.rooms].includes(selectFilterRooms.value)
    && [getGuestsValue(guests), Default.quests].includes(selectFilterGuests.value)
    ) {
      copiedPins.push(arr[i]);
    }

    if(copiedPins.length === MAX_LENGTH_PINS_ARRAY) {
      break;
    }
  }
  return copiedPins;
};


const сhangeCheckbox = (cb) => {
  chekboxsHousingFeatures.addEventListener('change', () => {

    removeMapPin();
    cb();
  });
};

const сhangeFilterTypeHousing = (cb) => {
  selectFilterTypeHousing.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const сhangeFilterPrice = (cb) => {
  selectFilterPrice.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const сhangeFilterRooms = (cb) => {
  selectFilterRooms.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const сhangeFilterGuests = (cb) => {
  selectFilterGuests.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

export {filterPins, сhangeFilterTypeHousing, сhangeFilterPrice, сhangeFilterRooms, сhangeFilterGuests, сhangeCheckbox};
