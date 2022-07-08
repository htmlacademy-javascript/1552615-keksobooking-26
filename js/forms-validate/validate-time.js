import {pristine, adForm} from './create-pristine.js';

const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const validateTime = () => timeInField.value === timeOutField.value || timeOutField.value === timeInField.value;

pristine.addValidator(timeInField, validateTime);
pristine.addValidator(timeOutField, validateTime);

const timeInChange = () => {
  timeInField.value = timeOutField.value;
  pristine.validate(timeInField);
};

const timeOutChange = () => {
  timeOutField.value = timeInField.value;
  pristine.validate(timeOutField);
};

timeInField.addEventListener('change', timeOutChange);
timeOutField.addEventListener('change', timeInChange);
