import { MARKER_SETTING } from './constants.js';
import { filterType} from './filter.js';
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

const templateUserPopap = document.querySelector('#card');

const createPopupFeatures = (features, featuresContainer) => {
  if (features) {
    features.forEach((featureClass) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${featureClass}`);
      featuresContainer.appendChild(feature);
    });
  }
};

const createPopupImage = (imageArray, imageContainer) => {
  if (imageArray) {
    imageArray.forEach((photoSrc) => {
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

const createPopupCard = ({ author, offer, location }) => {
  const element = templateUserPopap.cloneNode(true).content;
  const popupFeatures = element.querySelector('.popup__features');
  const features = offer.features;
  const popupPhotos = element.querySelector('.popup__photos');
  const photos = offer.photos;

  element.querySelector('.popup__avatar').src = author.avatar;
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = HOUSING_TYPE_DICTIONARY[offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  popupFeatures.textContent = '';
  createPopupFeatures(features, popupFeatures);

  element.querySelector('.popup__description').textContent = offer.description;

  popupPhotos.textContent = '';
  createPopupImage(photos, popupPhotos);

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
  const fragment = document.createDocumentFragment();
  const sortCards = cards.slice();
  filterType(sortCards)
    .forEach((card) => {
      const element = createPopupCard(card);
      fragment.appendChild(element);
    });
  layerGroup.addTo(myMap);
  return fragment;
};


export {createPopupCards, removeMapPin};
