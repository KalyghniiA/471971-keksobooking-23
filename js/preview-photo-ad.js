import { FILE_TYPES } from './constants.js';

const adImgContainer = document.querySelector('.ad-form__photo-container');
const adImgChooser= document.querySelector('#images');


adImgChooser.addEventListener('change', () => {
  const adImgFiles = Object.values(adImgChooser.files);

  adImgFiles.forEach((file) => {

    const adImgFileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => adImgFileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const adImg = document.createElement('img');
        adImg.classList.add('ad-form__photo');
        adImg.src = reader.result;
        adImg.width = 70;
        adImg.height = 70;
        adImgContainer.appendChild(adImg);
      });

      reader.readAsDataURL(file);
    }
  });


});
