import { onResetForm, toggleStateForm } from './form.js';


const removePopupElement = (selector) => {
  document.querySelector(selector).remove();
  toggleStateForm(false);
  onResetForm();
};

const additionPopupElement = (selector) => {
  const popupTemplate = document.querySelector(selector).cloneNode(true).content;
  document.body.appendChild(popupTemplate);
  toggleStateForm(true);
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

const onClosePopupErrorClick = () => {
  removePopupElement('.error');
  document.removeEventListener('keydown', onClosePopupErrorButton);
};

const onClosePopupSuccessClick = () => {
  removePopupElement('.success');
  document.removeEventListener('keydown', onClosePopupSuccessButton);
};

const createPopupError = () => {
  additionPopupElement('#error');
  document.querySelector('.error').addEventListener('click', onClosePopupErrorClick);
  document.addEventListener('keydown', onClosePopupErrorButton);

};

const createPopupSuccess = () => {
  additionPopupElement('#success');
  document.querySelector('.success').addEventListener('click', onClosePopupSuccessClick);
  document.addEventListener('keydown', onClosePopupSuccessButton);
};

export {createPopupError, createPopupSuccess};
