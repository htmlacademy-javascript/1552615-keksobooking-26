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

export {getRandomInt, getRandomFloat, getRandomAddress, getRandomArrayElement, getStringFromUniqueElements};
