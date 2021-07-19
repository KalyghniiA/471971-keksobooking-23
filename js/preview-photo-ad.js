import { FILE_TYPES } from './constants.js';

const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;
export const adImgContainer = document.querySelector('.ad-form__photo-container');
const adImgChooser = document.querySelector('#images');


adImgChooser.addEventListener('change', () => {
  const adImgFiles = Object.values(adImgChooser.files);
  const imagePlag = document.querySelector('div.ad-form__photo');

  adImgFiles.forEach((file) => {

    const adImgFileName = file.name.toLowerCase();

    const isValidExtension = FILE_TYPES.some((extension) => adImgFileName.endsWith(extension));

    if (imagePlag) {
      imagePlag.remove();
    }

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
