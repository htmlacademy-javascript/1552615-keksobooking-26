const MIN_ADDRESS = 1;
const MAX_ADDRESS = 10;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const TITLES = [
  'Внимание, внимание!',
  'Объявление',
  'Сдается!',
  'Спешите'
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const NUMBS_AFTER_POINT = 5;
const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
];
const DESCRIPTIONS = [
  'Просторные и светлые комнаты, солнечная сторона',
  'Маленькие и темные комнаты, бедете сидеть на шее у соседа. Окон нет. Двери тоже',
  'Яркие оражневые обои на стенах, кислотно зеленого цвета кухня, темно-бордовый пол... Несколько дней в нашей квартире и дурдом вам обеспечен!',
  'Комнаты в скандинавском стиле. И этим все сказано!'
];
const ADVERT_COUNT = 10;

//Вовращает случайное целое число из диапазона min, max
const getRandomInt = function (min, max) {
  if (min < 0 || max < 0 || min === max) {
    return undefined;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return (Math.floor(Math.random() * (max - min + 1) + min));
};

//Вовращает случайное число с плаващющей точкой из диапазона min, max
//округленное до заданного кол-ва цифр после запятой numbsAfterPoint
const getRandomFloat = function (min, max, numbsAfterPoint) {
  if (min < 0 || max < 0 || min === max) {
    return undefined;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min) + min).toFixed(numbsAfterPoint);
};

const getRandomAddress = (min, max) => {
  const randomInt = getRandomInt(min, max);
  if (randomInt === 10) {
    return `${randomInt}`;
  }
  return `0${randomInt}`;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getStringFromUniqueElements = (arr) => {
  const randomInt = getRandomInt(1, arr.length - 1);
  const randomLengthArray = new Array(randomInt).fill(null).map(() => getRandomArrayElement(arr));
  return Array.from(new Set(randomLengthArray)).join(', ');
};

const createAuthor = function () {
  return {avatar: `img/avatars/user${getRandomAddress(MIN_ADDRESS, MAX_ADDRESS)}.png`};
};

const createLocation = function() {
  return {
    lat: getRandomFloat(MIN_LAT, MAX_LAT, NUMBS_AFTER_POINT),
    lng: getRandomFloat(MIN_LNG, MAX_LNG, NUMBS_AFTER_POINT),
  };
};

const createOffer = function () {
  return {
    title: getRandomArrayElement(TITLES),
    address: Object.values(createLocation()).join(', '),
    price: getRandomInt (MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInt(MIN_ADDRESS, MAX_ADDRESS),
    guests: getRandomInt(MIN_ADDRESS, MAX_ADDRESS),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: getStringFromUniqueElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getStringFromUniqueElements(PHOTOS),
  };
};

const createAdvert = function () {
  return {
    author: createAuthor(),
    location: createLocation(),
    offer: createOffer(),
  };
};

const adverts = Array.from({length: ADVERT_COUNT}, createAdvert);
