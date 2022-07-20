import {pristine, adForm} from './create-pristine.js';

const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const validateTime = () => timeInField.value === timeOutField.value || timeOutField.value === timeInField.value;

pristine.addValidator(timeInField, validateTime);
pristine.addValidator(timeOutField, validateTime);

const onTimeInSelectChange = () => {
  timeInField.value = timeOutField.value;
  pristine.validate(timeInField);
};

const onTimeOutSelectChange = () => {
  timeOutField.value = timeInField.value;
  pristine.validate(timeOutField);
};

timeInField.addEventListener('change', onTimeOutSelectChange);
timeOutField.addEventListener('change', onTimeInSelectChange);
