import { MIN_PRICE, USER_MARKER_LAT, USER_MARKER_LNG } from './constants.js';
import { setStartingLocation, userMarker } from './map.js';
import { announcementForm, inputAddress, inputPrice} from './validation.js';


const toggleStateForm = (state) => {
  document.querySelector('.ad-form__submit').disabled = state;
};


const onResetForm = () => {
  announcementForm.form.reset();
  inputAddress.value = setStartingLocation(USER_MARKER_LAT, USER_MARKER_LNG);
  inputPrice.placeholder = MIN_PRICE;
  userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
};

export {toggleStateForm, onResetForm};
