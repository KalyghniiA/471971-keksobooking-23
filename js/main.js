import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { addListenerChangeFilterPrice, addListenerChangeFilterGuests, addListenerChangeFilterRooms, addListenerChangeFilterTypeHousing, addListenerChangeCheckbox } from './filter.js';
import { debounce } from './utils/debounce.js';


getData((pins) => {
  createPopupCards(pins);
  addListenerChangeFilterTypeHousing(debounce(() => createPopupCards(pins), 500));
  addListenerChangeFilterPrice(debounce(() => createPopupCards(pins), 500));
  addListenerChangeFilterRooms(debounce(() => createPopupCards(pins), 500));
  addListenerChangeFilterGuests(debounce(() => createPopupCards(pins), 500));
  addListenerChangeCheckbox(debounce(() => createPopupCards(pins), 500));
});

