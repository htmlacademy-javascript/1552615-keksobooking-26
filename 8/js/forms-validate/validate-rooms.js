import {pristine, adForm} from './create-pristine.js';

const roomsGuestsOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей']
};

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
