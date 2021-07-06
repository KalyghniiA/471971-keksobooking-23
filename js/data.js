import { createPopupCards } from './create-popup.js';
import { createPopupError, createPopupSuccess} from './popup.js';
import { announcementForm } from './validation.js';

const SERVER_PATH = 'https://23.javascript.pages.academy/keksobooking';
const SERVER_DATA = 'https://23.javascript.pages.academy/keksobooking/data';


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
