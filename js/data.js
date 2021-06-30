import { createPopupCards } from './create-popup.js';

const SERVER_PATH = 'https://23.javascript.pages.academy/keksobooking/data';
const EXPORT_SERVER = 'https://23.javascript.pages.academy/keksobooking';
const formUser = document.querySelector('.ad-form');


fetch(SERVER_PATH)
  .then((response) => response.json())
  .then((data) => {

    createPopupCards(data);

  });




const closePopup = (element) => {
  document.body.removeChild(element);
};


const popupOpen = (templateId, popupClass) => {
  const popupTemplate = document.querySelector(templateId).cloneNode(true).content;
  document.body.appendChild(popupTemplate);

  const popup = document.querySelector(popupClass);
  popup.addEventListener('click', () => {
    closePopup(popup);
  });

  window.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  });
};


formUser.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(EXPORT_SERVER, {
    method: 'POST',
    body: formData,
  })
    .then(() => popupOpen('#success', '.success'))
    .catch(() => popupOpen('#error', '.error'));

});
