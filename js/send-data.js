import { sendData } from './api.js';
import { showSuccessPopup, showErrorPopup } from './form-messages.js';
import { adForm, pristine } from './forms-validate/create-pristine.js';
import { resetPriceSlider } from './forms-validate/validate-price.js';
import { resetMainPin } from './map.js';
import { resetForms } from './ad-form.js';

const formSubmitButton = adForm.querySelector('.ad-form__submit');
const formResetButton = adForm.querySelector('.ad-form__reset');

const setFormSubmit = ((onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      formSubmitButton.disabled = true;
      sendData(
        () => {
          onSuccess();
          resetPriceSlider();
          showSuccessPopup();
          resetMainPin();
          formSubmitButton.disabled = false;
        },
        () => {
          showErrorPopup();
          formSubmitButton.disabled = false;
        },
        new FormData(evt.target),
      );
    }
  });
});

setFormSubmit(resetForms);

formResetButton.addEventListener('click', () => {
  resetForms();
  resetMainPin();
  resetPriceSlider();
});
