import { SERVER_DATA, SERVER_PATH } from './constants.js';
import { createPopupCards } from './create-popup-mark.js';
import { createPopupError, createPopupSuccess} from './popup.js';
import { announcementForm } from './validation.js';

fetch(SERVER_DATA)
  .then((response) => response.json())
  .then((data) => {
    createPopupCards(data);
  });

announcementForm.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetch(SERVER_PATH, {
    method: 'POST',
    body: new FormData(evt.target),
  })
    .then(createPopupSuccess)
    .catch(createPopupError);

});
