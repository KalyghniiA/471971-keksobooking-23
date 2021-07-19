import { AVATAR_TEMPLATE, MIN_PRICE, USER_MARKER_LAT, USER_MARKER_LNG } from './constants.js';
import { setStartingLocation, userMarker } from './map.js';
import { avatarImg } from './preview-avatar.js';
import { adImgContainer } from './preview-photo-ad.js';
import { announcementForm, formFilters, inputAddress, inputPrice} from './validation.js';


const toggleStateForm = (state) => {
  document.querySelector('.ad-form__submit').disabled = state;
};


const onResetForm = () => {
  announcementForm.form.reset();
  formFilters.form.reset();
  inputAddress.value = setStartingLocation(USER_MARKER_LAT, USER_MARKER_LNG);
  inputPrice.placeholder = MIN_PRICE;
  userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
  avatarImg.src = AVATAR_TEMPLATE;

  adImgContainer.querySelectorAll('img.ad-form__photo')
    .forEach((image) => {
      image.remove();
    });

  if(! document.querySelector('div.ad-form__photo')) {
    const imagePlag = document.createElement('div');
    imagePlag.classList.add('ad-form__photo');
    adImgContainer.appendChild(imagePlag);
  }
};

export {toggleStateForm, onResetForm};
