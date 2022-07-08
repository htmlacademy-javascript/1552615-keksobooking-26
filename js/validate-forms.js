import { pristine,adForm } from './forms-validate/create-pristine.js';
import './forms-validate/validate-title.js';
import './forms-validate/validate-price.js';
import './forms-validate/validate-rooms.js';
import './forms-validate/validate-time.js';

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
