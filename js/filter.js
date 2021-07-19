/* eslint-disable id-length */
import { removeMapPin } from './create-popup-mark.js';
const MAX_PINS_ON_MAP = 10;
const MIN_VALUE_FILTER_PRICE = 10000;
const MAX_VALUE_FILTER_PRICE = 50000;
const selectFilterTypeHousing = document.querySelector('#housing-type');
const selectFilterPrice = document.querySelector('#housing-price');
const selectFilterRooms = document.querySelector('#housing-rooms');
const selectFilterGuests = document.querySelector('#housing-guests');
const checkboxesHousingFeatures = document.querySelector('#housing-features');
const Default = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};

const isValidTypeValue = (type, selectedFilterValue) => {
  const filterValue = selectedFilterValue;

  if (filterValue === Default.type) {
    return true;
  }

  return type === filterValue;
};

const getPriceValue = (price) => {
  if (price >= MIN_VALUE_FILTER_PRICE && price <= MAX_VALUE_FILTER_PRICE) {
    return 'middle';
  }

  if (price < MIN_VALUE_FILTER_PRICE) {
    return 'low';
  }

  if (price > MAX_VALUE_FILTER_PRICE) {
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
  const checkboxChecked = [];
  checkboxesHousingFeatures.querySelectorAll('.map__checkbox:checked').forEach((el) => {
    checkboxChecked.push(el.value);
  });

  mainLoop:for (let i = 0; i < pins.length; i++) {

    const {offer: {type, price, rooms, guests, features}} = pins[i];

    for (let j = 0; j < checkboxChecked.length; j++) {
      if (! checkboxChecked) {
        break;
      }

      if (! features || ! features.includes(checkboxChecked[j])) {
        continue mainLoop;
      }
    }

    if (
      isValidTypeValue(type, selectFilterTypeHousing.value)
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


const setFeatureChangingFilterListener = (cb) => {
  checkboxesHousingFeatures.addEventListener('change', () => {

    removeMapPin();
    cb();
  });
};

const setHousingChangingFilterListener = (cb) => {
  selectFilterTypeHousing.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const setPriceChangingFilterListener = (cb) => {
  selectFilterPrice.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const setRoomsChangingFilterListener = (cb) => {
  selectFilterRooms.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

const setGuestsChangingFilterListener = (cb) => {
  selectFilterGuests.addEventListener('change', () => {
    removeMapPin();
    cb();
  });
};

export {filterPins, setFeatureChangingFilterListener, setRoomsChangingFilterListener, setGuestsChangingFilterListener, setHousingChangingFilterListener, setPriceChangingFilterListener};
