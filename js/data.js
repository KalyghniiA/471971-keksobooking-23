import { SERVER_DATA, SERVER_PATH } from './constants.js';
import { createPopupError, createPopupSuccess} from './popup.js';
import { announcementForm } from './validation.js';

const CLASS_NAME = 'map__error';
const TEXT = 'Произошла ошибка! Попробуйте обновить страницу';
const BUTTON_TEXT = 'Закрыть';

const createErrorMesage = () => {

  const message = document.createElement('div');
  message.classList.add(CLASS_NAME);
  const textMessage = document.createElement('p');
  textMessage.textContent = TEXT;
  const button = document.createElement('button');
  button.textContent = BUTTON_TEXT;
  message.appendChild(textMessage);
  message.appendChild(button);
  document.querySelector('.map__canvas').appendChild(message);

  const closeErrorPopUpHandler = () => {
    message.remove();
    document.removeEventListener('click', closeErrorPopUpHandler);
  };

  button.addEventListener('click', closeErrorPopUpHandler);
};

const getData = (onSuccess) => {
  fetch(SERVER_DATA)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      createErrorMesage();
    });
};


announcementForm.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetch(SERVER_PATH, {
    method: 'POST',
    body: new FormData(evt.target),
  })
    .then(createPopupSuccess)
    .catch(createPopupError);

});

export {getData};
