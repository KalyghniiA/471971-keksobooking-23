

const HOUSING_TYPE_DICTIONARY = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};


const mymap = L.map('mapid').setView([35.67241003316495, 139.74678744350908], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWthbHlnaG5paSIsImEiOiJja3BtaGdyYzIwZmh5Mm9tZXVuamZ6cGJvIn0.BCZrDM9bJwrbOYzVqxDZjw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token',
}).addTo(mymap);


const templateUserPopap = document.querySelector('#card');

const createPopupFeatures = (featuresArray, featuresContainer) => {

  if (featuresArray) {
    featuresArray.forEach((featureClass) => {
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

  L.marker([location.lat, location.lng]).addTo(mymap).bindPopup(content);


  return element;
};

const cards = (cardsArray) => {
  const fragment = document.createDocumentFragment();
  cardsArray.forEach((card) => {
    const element = createPopupCard(card);
    fragment.appendChild(element);
  });

  return fragment;
};

export {cards};
