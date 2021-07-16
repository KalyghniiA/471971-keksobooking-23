import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { setFeatureChangingFilterListener, setGuestsChangingFilterListener, setHousingChangingFilterListener, setPriceChangingFilterListener, setRoomsChangingFilterListener } from './filter.js';
import { debounce } from './utils/debounce.js';
import './preview-avatar.js';
import './preview-photo-ad.js';


getData((pins) => {
  createPopupCards(pins);
  setHousingChangingFilterListener(debounce(() => createPopupCards(pins), 500));
  setPriceChangingFilterListener(debounce(() => createPopupCards(pins), 500));
  setRoomsChangingFilterListener(debounce(() => createPopupCards(pins), 500));
  setGuestsChangingFilterListener(debounce(() => createPopupCards(pins), 500));
  setFeatureChangingFilterListener(debounce(() => createPopupCards(pins), 500));
});

