import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { onChangeFilterPrice, onChangeFilterGuests, onChangeFilterRooms, onChangeFilterTypeHousing, onChangeCheckbox } from './filter.js';
import { debounce } from './utils/debounce.js';


getData((pins) => {
  createPopupCards(pins);
  onChangeFilterTypeHousing(debounce(() => createPopupCards(pins), 500));
  onChangeFilterPrice(debounce(() => createPopupCards(pins), 500));
  onChangeFilterRooms(debounce(() => createPopupCards(pins), 500));
  onChangeFilterGuests(debounce(() => createPopupCards(pins), 500));
  onChangeCheckbox(debounce(() => createPopupCards(pins), 500));
});

