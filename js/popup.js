import { announcementForm, resetForm } from './validation.js';


const removePopupElement = (selector) => {
  document.querySelector(selector).remove();
  announcementForm.form.querySelector('.ad-form__submit').disabled = false;
  resetForm();
};

const additionPopupElement = (selector) => {
  const popupTemplate = document.querySelector(selector).cloneNode(true).content;
  document.body.appendChild(popupTemplate);
  announcementForm.form.querySelector('.ad-form__submit').disabled = true;
};

const onClosePopupErrorButton = (evt) => {
  if(evt.key === 'Escape') {
    removePopupElement('.error');
    document.removeEventListener('keydown', onClosePopupErrorButton);
  }

};


const onClosePopupSuccessButton = (evt) => {
  if(evt.key === 'Escape') {
    removePopupElement('.success');
    document.removeEventListener('keydown', onClosePopupSuccessButton);
  }
};

const closePopupErrorClick = () => {
  removePopupElement('.error');
  document.removeEventListener('keydown', onClosePopupErrorButton);
};

const onClosePopupSuccessClick = () => {
  removePopupElement('.success');
  document.removeEventListener('keydown', onClosePopupSuccessButton);
};

const createPopupError = () => {
  additionPopupElement('#error');
  const popup = document.querySelector('.error');
  popup.addEventListener('click', closePopupErrorClick);
  document.addEventListener('keydown', onClosePopupErrorButton);

};

const createPopupSuccess = () => {
  additionPopupElement('#success');
  const popup = document.querySelector('.success');
  popup.addEventListener('click', onClosePopupSuccessClick);
  document.addEventListener('keydown', onClosePopupSuccessButton);
};

export {createPopupError, createPopupSuccess};
