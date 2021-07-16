import { FILE_TYPES } from './constants.js';

const avatarImg = document.querySelector('.ad-form-header__preview img');
const avatarChooser= document.querySelector('#avatar');


avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarImg.src = reader.result;
    });

    reader.readAsDataURL(avatarFile);
  }

});

