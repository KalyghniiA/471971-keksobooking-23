import { getRandomFloat, getRandomNumber } from './util.js';
import { TYPES_OF_HOUSING } from './validation.js';

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION_LAT_START = 35.65000;
const LOCATION_LAT_END = 35.70000;
const LOCATION_LNG_START = 139.70000;
const LOCATION_LNG_END = 139.80000;
const FLOAT = 5;
const QUANTITY_TEST_OBJECTS = 10;

const generationAuthor = () => {
  const locationLat = getRandomFloat(LOCATION_LAT_START, LOCATION_LAT_END, FLOAT);
  const locationLng = getRandomFloat(LOCATION_LNG_START, LOCATION_LNG_END, FLOAT);


  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },
    offer: {
      title: 'Lorem ipsum dolor sit amet',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomNumber(1000, 500000),
      type: TYPES_OF_HOUSING[getRandomNumber(0, TYPES_OF_HOUSING.length - 1)].type,
      rooms: getRandomNumber(1, 100),
      quests: getRandomNumber(1, 100),
      checkin: CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
      features: FACILITIES.slice(getRandomNumber(0, FACILITIES.length - 1)),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      photos: PHOTOS.slice(getRandomNumber(0, PHOTOS.length - 1)),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const creationTestObjects = (quantity) => new Array(quantity).fill(null).map(() => generationAuthor());


creationTestObjects(QUANTITY_TEST_OBJECTS);
