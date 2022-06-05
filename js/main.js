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

getRandomInt(1, 3);
getRandomFloat(1.1, 1.5, 4);
