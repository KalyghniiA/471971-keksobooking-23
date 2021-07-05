import { createPopupCards } from './create-popup.js';
import { userMarker, USER_MARKER_LAT, USER_MARKER_LNG } from './map.js';
import { inputAddres } from './validation.js';

const SERVER_PATH = 'https://23.javascript.pages.academy/keksobooking/data';
const EXPORT_SERVER = 'https://23.javascript.pages.academy/keksobooking';
const formUser = document.querySelector('.ad-form');


fetch(SERVER_PATH)
  .then((response) => response.json())
  .then((data) => {

    createPopupCards(data);

  });


const closePopupErrorButton = (evt) => {
  if(evt.key === 'Escape') {
    const popupError = document.querySelector('.error');
    popupError.remove();
    formUser.querySelector('.ad-form__submit').disabled = false;
    formUser.reset();
    inputAddres.value = `${USER_MARKER_LAT}, ${USER_MARKER_LNG}`;
    userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
    document.removeEventListener('keydown', closePopupErrorButton);
  }

};


const closePopupSuccessButton = (evt) => {
  if(evt.key === 'Escape') {
    const popupSuccess = document.querySelector('.success');
    popupSuccess.remove();
    formUser.querySelector('.ad-form__submit').disabled = false;
    formUser.reset();
    inputAddres.value = `${USER_MARKER_LAT}, ${USER_MARKER_LNG}`;
    userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
    document.removeEventListener('keydown', closePopupSuccessButton);
  }
};

const closePopupErrorClick = () => {
  const popupError = document.querySelector('.error');
  popupError.remove();
  formUser.querySelector('.ad-form__submit').disabled = false;
  formUser.reset();
  inputAddres.value = `${USER_MARKER_LAT}, ${USER_MARKER_LNG}`;
  userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
  document.removeEventListener('keydown', closePopupErrorButton);
};

const closePopupSuccessClick = () => {
  const popupSuccess = document.querySelector('.success');
  popupSuccess.remove();
  formUser.querySelector('.ad-form__submit').disabled = false;
  formUser.reset();
  inputAddres.value = `${USER_MARKER_LAT}, ${USER_MARKER_LNG}`;

  userMarker.setLatLng(L.latLng(USER_MARKER_LAT, USER_MARKER_LNG));
  document.removeEventListener('keydown', closePopupSuccessButton);
};

const popupOpenError = () => {
  const popupTemplateError = document.querySelector('#error').cloneNode(true).content;
  document.body.appendChild(popupTemplateError);
  formUser.querySelector('.ad-form__submit').disabled = true;

  const popup = document.querySelector('.error');
  popup.addEventListener('click', closePopupErrorClick);

  document.addEventListener('keydown', closePopupErrorButton);

};

const popupOpenSuccess = () => {
  const popupTemplateSuccess = document.querySelector('#success').cloneNode(true).content;
  document.body.appendChild(popupTemplateSuccess);
  formUser.querySelector('.ad-form__submit').disabled = true;

  const popup = document.querySelector('.success');
  popup.addEventListener('click', closePopupSuccessClick);

  document.addEventListener('keydown', closePopupSuccessButton);
};

formUser.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(EXPORT_SERVER, {
    method: 'POST',
    body: formData,
  })
    .then(() => popupOpenSuccess())
    .catch(() => popupOpenError());

});
