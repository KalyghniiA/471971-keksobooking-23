/* eslint-disable id-length */
import { removeMapPin } from './create-popup-mark.js';

const selectFilterTypeHousing = document.querySelector('#housing-type');
const selectFilterPrice = document.querySelector('#housing-price');
const selectFilterRooms = document.querySelector('#housing-rooms');
const selectFilterGuests = document.querySelector('#housing-guests');
const checkboxesHousingFeatures = document.querySelector('#housing-features');
const MAX_PINS_ON_MAP = 10;
const Default = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  quests: 'any',
};

const getPriceValue = (price) => {
  if (price >= 10000 && price <= 50000) {
    return 'middle';
  }

  if (price < 10000) {
    return 'low';
  }

  if (price > 50000) {
    return 'high';
  }
};

const isValidRoomsValue = (rooms, selectedFilterValue) => {
  const filterValue = selectedFilterValue;

  if (filterValue === Default.rooms) {
    return true;
  }

  return rooms === Number(filterValue);
};

const isValidGuestsValue = (guests, selectedFilterValue) => {
  const filterValue = selectedFilterValue;

  if (filterValue === Default.guests) {
    return true;
  }

  return guests === Number(filterValue);
};

const filterPins = (pins) => {
  const copiedPins = [];
  const checkboxArrayChecked = [];
  checkboxesHousingFeatures.querySelectorAll('.map__checkbox:checked').forEach((el) => {
    checkboxArrayChecked.push(el.value);
  });

  mainLoop:for (let i = 0; i < pins.length; i++) {

    const {offer: {type, price, rooms, guests, features}} = pins[i];

    for (let j = 0; j < checkboxArrayChecked.length; j++) {
      if (! checkboxArrayChecked) {
        break;
      }

      if (! features || ! features.includes(checkboxArrayChecked[j])) {
        continue mainLoop;
      }
    }


    if (
      [type, Default.type].includes(selectFilterTypeHousing.value)
    && [getPriceValue(price), Default.price].includes(selectFilterPrice.value)
    && isValidRoomsValue(rooms, selectFilterRooms.value)
    && isValidGuestsValue(guests, selectFilterGuests.value)
    ) {
      copiedPins.push(pins[i]);
    }

    if (copiedPins.length === MAX_PINS_ON_MAP) {
      break;
    }
  }
  return copiedPins;
};


const addListenerChangeCheckbox = (cb) => {
  checkboxesHousingFeatures.addEventListener('change', () => {

    removeMapPin();
    cb();
  });
};

const addListenerChangeFilterTypeHousing = (cb) => {
  selectFilterTypeHousing.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const addListenerChangeFilterPrice = (cb) => {
  selectFilterPrice.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const addListenerChangeFilterRooms = (cb) => {
  selectFilterRooms.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const addListenerChangeFilterGuests = (cb) => {
  selectFilterGuests.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

export {filterPins, addListenerChangeFilterTypeHousing, addListenerChangeFilterPrice, addListenerChangeFilterRooms, addListenerChangeFilterGuests, addListenerChangeCheckbox};
