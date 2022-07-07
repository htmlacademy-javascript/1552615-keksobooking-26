import { adForm } from './forms.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE  = 100000;
const roomsGuestsOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей']
};

const pristine = new Pristine (adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
}, false);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const validatePrice = (value) => parseInt(value, 10) > 0 && parseInt(value, 10) <= MAX_PRICE;

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'От 0 до 100000 руб.'
);

const roomField = adForm.querySelector('#room_number');
const roomOptions = roomField.options;
const capacityField = adForm.querySelector('#capacity');
const capacityOptions = capacityField.options;

const validateRooms = () => roomsGuestsOption[roomOptions[roomField.selectedIndex].text].includes(capacityOptions[capacityField.selectedIndex].text);

const getRoomsErrorMessage = () => `
<br>
${roomOptions[roomField.selectedIndex].text}
${capacityOptions[capacityField.selectedIndex].text !== 'не для гостей' ? 'не' : ''}
${capacityOptions[capacityField.selectedIndex].text !== 'не для гостей' ? capacityOptions[capacityField.selectedIndex].text : 'для гостей'}
`;

pristine.addValidator(roomField, validateRooms);
pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
