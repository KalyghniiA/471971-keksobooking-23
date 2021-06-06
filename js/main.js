
const validateRandomNumber = (start, end) => {
  if (start > end) {
    throw new Error('Начальное число больше конечного');
  }

  if (start < 0 || end < 0) {
    throw new Error('Числа должны быть положительными');
  }
};

const getRandomNumber = (start, end) => {
  validateRandomNumber(start, end);

  return Math.floor(Math.random() * (end - start) + start);
};

const getRandomFloat = (start, end, precision) => {
  validateRandomNumber(start, end);

  return (Math.random() * (end - start) + start).toFixed(precision);
};


//Validation

const selectTypeHousing = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectQuantityRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

const TYPES_OF_HOUSING = [
  {
    type: 'bungalow',
    minPrice: 0,
  },
  {
    type: 'flat',
    minPrice: 1000,
  },
  {
    type: 'hotel',
    minPrice: 3000,
  },
  {
    type: 'house',
    minPrice: 5000,
  },
  {
    type: 'palace',
    minPrice: 10000,
  },
];

const ROOMS_TO_GUESTS_MAPPER = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

selectTypeHousing.addEventListener('change', () => {
  TYPES_OF_HOUSING.forEach(({ type, minPrice }) => {
    if (selectTypeHousing.value === type) {
      inputPrice.min = minPrice;
    }
  });
});

selectQuantityRoom.addEventListener('change', (evt) => {
  let flag = false;

  for (const quantityPerson of selectCapacity.children) {
    const isAvailableQuantity = ROOMS_TO_GUESTS_MAPPER[evt.target.value].includes(+quantityPerson.value);
    quantityPerson.disabled = !isAvailableQuantity;

    if(!flag && isAvailableQuantity) {
      flag = true;
      quantityPerson.selected = true;
    }

  }
});

selectTimeIn.addEventListener('change', (evt) => {
  selectTimeOut.value = evt.target.value;
});

selectTimeOut.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
});

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
  const locationLat = getRandomFloat(LOCATION_LAT_START, LOCATION_LAT_END,FLOAT);
  const locationLng = getRandomFloat(LOCATION_LNG_START,LOCATION_LNG_END, FLOAT);


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
      features: FACILITIES.slice(getRandomNumber(0,FACILITIES.length - 1)),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      photos: PHOTOS.slice(getRandomNumber(0, PHOTOS.length - 1)),
    },
    location:{
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const creationTestObjects = (quantity) => new Array(quantity).fill(null).map(() => generationAuthor());


creationTestObjects(QUANTITY_TEST_OBJECTS);
