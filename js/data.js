import { createPopupCards } from './create-popup.js';

const SERVER_PATH = 'https://23.javascript.pages.academy/keksobooking/data';

fetch(SERVER_PATH)
  .then((response) => response.json())
  .then((data) => {

    createPopupCards(data);

  });

