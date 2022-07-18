const ALERT_SHOW_TIME = 10000;
const DEFAULT_MAP_SETTINGS = {
  lat: 35.6894,
  lng: 139.692,
  scale: 12
};

//Вовращает случайное целое число из диапазона min, max
const getRandomInt = (min, max) => {
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
const getRandomFloat = (min, max, numbsAfterPoint) => {
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

const getEqualInObj = (value, obj) => {
  for (const i in obj) {
    if (i === value) {
      return obj[i];
    }
  }
};

const setDisabledAttr = (elements) => {
  elements.forEach((element) => {
    element.setAttribute ('disabled', 'disabled');
  });
};

const removeDisabledAttr = (elements) => {
  elements.forEach((element) => {
    element.removeAttribute ('disabled', 'disabled');
  });
};

const getAddressFromMap = (coordinates) => {
  const {lat, lng} = coordinates;
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

const showAlert = (message) => {
  const alertContainer = document.createElement('p');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '1000px';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '40px 20px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.verticalAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.border = '2px black solid';
  alertContainer.style.boxShadow = '2px 3px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInt,
  getRandomFloat,
  getRandomAddress,
  getRandomArrayElement,
  getStringFromUniqueElements,
  getEqualInObj,
  setDisabledAttr,
  removeDisabledAttr,
  getAddressFromMap,
  showAlert,
  isEscEvent,
  DEFAULT_MAP_SETTINGS,
  debounce
};
