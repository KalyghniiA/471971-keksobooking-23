import { MARKER_SETTING } from './constants.js';
import { filterPins} from './filter.js';
import { myMap } from './map.js';

const HOUSING_TYPE_DICTIONARY = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const settingMarker = L.icon({
  iconUrl: MARKER_SETTING.url,
  iconSize: MARKER_SETTING.size,
  iconAnchor: MARKER_SETTING.anchor,
});

const templateUserPopup = document.querySelector('#card');

const createPopupFeatures = (features, featuresContainer) => {
  if (features) {
    features.forEach((featureClass) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${featureClass}`);
      featuresContainer.appendChild(feature);
    });
  }
};

const createPopupImage = (images, imageContainer) => {
  if (images) {
    images.forEach((photoSrc) => {
      const photo = document.createElement('img');

      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photo.src = photoSrc;
      imageContainer.appendChild(photo);
    });
  }
};

const layerGroup = L.layerGroup().addTo(myMap);

const createPopupCard = ({ author: {avatar}, offer: {title, address, price, type,rooms,guests,checkin,checkout,features, photos, description}, location }) => {
  const element = templateUserPopup.cloneNode(true).content;
  const popupFeatures = element.querySelector('.popup__features');
  const popupPhotos = element.querySelector('.popup__photos');


  if (avatar) {
    element.querySelector('.popup__avatar').src = avatar;
  } else {
    element.querySelector('.popup__avatar').remove();
  }

  if (title) {
    element.querySelector('.popup__title').textContent = title;
  } else {
    element.querySelector('.popup__title').remove();
  }

  if (address) {
    element.querySelector('.popup__text--address').textContent = address;
  } else {
    element.querySelector('.popup__text--address').remove();
  }

  if (price) {
    element.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span>`;
  } else {
    element.querySelector('.popup__text--price').remove();
  }

  if (type) {
    element.querySelector('.popup__type').textContent = HOUSING_TYPE_DICTIONARY[type];
  } else {
    element.querySelector('.popup__type').remove();
  }

  if (rooms && guests) {
    element.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    element.querySelector('.popup__text--capacity').remove();
  }

  if (checkin && checkout) {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    element.querySelector('.popup__text--time').remove();
  }

  if (features) {
    popupFeatures.textContent = '';
    createPopupFeatures(features, popupFeatures);
  } else {
    popupFeatures.remove();
  }

  if (description) {
    element.querySelector('.popup__description').textContent = description;
  } else {
    element.querySelector('.popup__description').remove();
  }

  if (photos) {
    popupPhotos.textContent = '';
    createPopupImage(photos, popupPhotos);
  } else {
    popupPhotos.remove();
  }


  const content = document.createElement('div');
  content.appendChild(element);

  const marker = L.marker([location.lat, location.lng], {icon:settingMarker});
  marker.addTo(layerGroup).bindPopup(content);


  return element;
};

const removeMapPin = () => {
  layerGroup.clearLayers();
};

const createPopupCards = (cards) => {
  layerGroup.clearLayers();
  const fragment = document.createDocumentFragment();
  const sortedCards = cards.slice();
  filterPins(sortedCards)
    .forEach((card) => {
      const element = createPopupCard(card);
      fragment.appendChild(element);
    });
  layerGroup.addTo(myMap);
  return fragment;
};


export {createPopupCards, removeMapPin};
