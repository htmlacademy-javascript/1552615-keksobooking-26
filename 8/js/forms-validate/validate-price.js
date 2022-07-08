import {pristine, adForm} from './create-pristine.js';

const MAX_PRICE  = 100000;
const minPriceOptions = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};

const typeField = adForm.querySelector('#type');
const typeOptions = typeField.options;
const priceField = adForm.querySelector('#price');

const minPriceChange = () => {
  for (const i in minPriceOptions) {
    if (i === typeOptions[typeField.selectedIndex].text) {
      priceField.placeholder = minPriceOptions[i];
    }
  }
};
typeField.addEventListener('change', minPriceChange);

const validatePrice = (value) => parseInt(value, 10) > parseInt(priceField.placeholder, 10) && parseInt(value, 10) <= MAX_PRICE;

const getPriceErrorMessage = () => `
От
${priceField.placeholder}
до
${MAX_PRICE} руб.
`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
