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
const priceSlider = adForm.querySelector('.ad-form__slider');
priceField.value = 0;

const minPriceChange = () => {
  for (const i in minPriceOptions) {
    if (i === typeOptions[typeField.selectedIndex].text) {
      priceField.placeholder = minPriceOptions[i];
      priceField.value = minPriceOptions[i];
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: parseInt(priceField.value, 10),
          max: MAX_PRICE,
        },
        start: parseInt(priceField.value, 10),
      });
    }
  }
};

noUiSlider.create(priceSlider, {
  range: {
    min: parseInt(priceField.value, 10),
    max: MAX_PRICE,
  },
  start: parseInt(priceField.value, 10),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    }
  },
});

typeField.addEventListener('change', minPriceChange);
priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
});

const validatePrice = (value) => parseInt(value, 10) > parseInt(priceField.placeholder, 10) && parseInt(value, 10) <= MAX_PRICE;

const getPriceErrorMessage = () => `
От
${priceField.placeholder}
до
${MAX_PRICE} руб.
`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const resetPriceSlider = () => {
  priceSlider.noUiSlider.reset();
};

export { resetPriceSlider };
