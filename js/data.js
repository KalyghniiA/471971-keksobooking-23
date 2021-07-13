import { SERVER_DATA, SERVER_PATH } from './constants.js';
import { createPopupError, createPopupSuccess} from './popup.js';
import { announcementForm } from './validation.js';


const getData = (onSuccess) => {
  fetch(SERVER_DATA)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
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
