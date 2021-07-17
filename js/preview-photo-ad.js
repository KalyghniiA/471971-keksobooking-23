import { FILE_TYPES } from './constants.js';

export const adImgContainer = document.querySelector('.ad-form__photo-container');
const adImgChooser = document.querySelector('#images');
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;


adImgChooser.addEventListener('change', () => {
  const adImgFiles = Object.values(adImgChooser.files);

  adImgFiles.forEach((file) => {

    const adImgFileName = file.name.toLowerCase();

    const isValidExtension = FILE_TYPES.some((extension) => adImgFileName.endsWith(extension));

    if (isValidExtension) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const adImg = document.createElement('img');
        adImg.classList.add('ad-form__photo');
        adImg.src = reader.result;
        adImg.width = IMAGE_WIDTH;
        adImg.height = IMAGE_HEIGHT;

        adImgContainer.appendChild(adImg);
      });

      reader.readAsDataURL(file);
    }
  });


});
