import { FILE_TYPES } from './constants.js';

export const avatarImg = document.querySelector('.ad-form-header__preview img');
const avatarChooser= document.querySelector('#avatar');


avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];

  if (avatarFile) {
    const avatarFileName = avatarFile.name.toLowerCase();

    const isValidExtension = FILE_TYPES.some((extension) => avatarFileName.endsWith(extension));

    if (isValidExtension) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarImg.src = reader.result;
      });

      reader.readAsDataURL(avatarFile);
    }
  }


});

