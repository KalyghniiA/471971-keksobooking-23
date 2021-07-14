import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { сhangeFilterPrice, сhangeFilterGuests, сhangeFilterRooms, сhangeFilterTypeHousing, сhangeCheckbox } from './filter.js';
import { debounce } from './utils/debounce.js';


getData((pins) => {
  createPopupCards(pins);
  сhangeFilterTypeHousing(debounce(() => createPopupCards(pins), 500));
  сhangeFilterPrice(debounce(() => createPopupCards(pins), 500));
  сhangeFilterRooms(debounce(() => createPopupCards(pins), 500));
  сhangeFilterGuests(debounce(() => createPopupCards(pins), 500));
  сhangeCheckbox(debounce(() => createPopupCards(pins), 500));
});

