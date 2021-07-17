import './map.js';
import './validation.js';
import './data.js';
import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { setFeatureChangingFilterListener, setGuestsChangingFilterListener, setHousingChangingFilterListener, setPriceChangingFilterListener, setRoomsChangingFilterListener } from './filter.js';
import { debounce } from './utils/debounce.js';
import './preview-avatar.js';
import './preview-photo-ad.js';
import { DEBOUNCE_INTERVAL } from './constants.js';


getData((pins) => {
  createPopupCards(pins);
  setHousingChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
  setPriceChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
  setRoomsChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
  setGuestsChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
  setFeatureChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
});

