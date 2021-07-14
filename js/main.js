import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { changeFilterPrice, changeFilterGuests, changeFilterRooms, changeFilterTypeHousing, changeCheckbox } from './filter.js';
import { debounce } from './utils/debounce.js';


getData((pins) => {
  createPopupCards(pins);
  changeFilterTypeHousing(debounce(() => createPopupCards(pins), 500));
  changeFilterPrice(debounce(() => createPopupCards(pins), 500));
  changeFilterRooms(debounce(() => createPopupCards(pins), 500));
  changeFilterGuests(debounce(() => createPopupCards(pins), 500));
  changeCheckbox(debounce(() => createPopupCards(pins), 500));
});

