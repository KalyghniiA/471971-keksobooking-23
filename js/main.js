import './map.js';
import './validation.js';
import './create-popup-mark.js';
import './data.js';

import { getData } from './data.js';
import {createPopupCards} from './create-popup-mark.js';
import { setFeatureChangingFilterListener, setGuestsChangingFilterListener, setHousingChangingFilterListener, setPriceChangingFilterListener, setRoomsChangingFilterListener } from './filter.js';
import { debounce } from './utils/debounce.js';
import './preview-avatar.js';
import './preview-photo-ad.js';
import { DEBOUNCE_INTERVAL, MAP_LAT, MAP_LNG, ZOOM_MAP } from './constants.js';
import { myMap } from './map.js';
import { announcementForm, formFilters, toggleVisibleForm } from './validation.js';

const enableFormParameter = false;

myMap.on('load', () => {
  toggleVisibleForm(announcementForm, enableFormParameter);
  toggleVisibleForm(formFilters, enableFormParameter);
  getData((pins) => {
    createPopupCards(pins);
    setHousingChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
    setPriceChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
    setRoomsChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
    setGuestsChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
    setFeatureChangingFilterListener(debounce(() => createPopupCards(pins), DEBOUNCE_INTERVAL));
  });
}).setView([MAP_LAT, MAP_LNG], ZOOM_MAP);


