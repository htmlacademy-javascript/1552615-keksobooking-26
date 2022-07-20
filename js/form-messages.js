import { isEscEvent } from './util.js';

const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  }
};
const onSubmitRemoveSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
};
const onSubmitShowSuccessPopup = () => {
  const successPopupFragment = document.createDocumentFragment();
  const successElement = successPopupTemplate.cloneNode(true);
  successPopupFragment.appendChild(successElement);
  document.body.appendChild(successPopupFragment);

  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  document.querySelector('.success').addEventListener('click', onSubmitRemoveSuccessPopup);
  document.querySelector('.success').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  }
};
const onSubmitRemoveErrorPopup = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  document.body.style.height = '';
  document.body.style.overflow = '';
};
const onSubmitShowErrorPopup = () => {
  const errorPopupFragment = document.createDocumentFragment();
  const errorElement = errorPopupTemplate.cloneNode(true);
  errorPopupFragment.appendChild(errorElement);
  document.body.appendChild(errorPopupFragment);

  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  document.querySelector('.error__button').addEventListener('click', onSubmitRemoveErrorPopup);
  document.querySelector('.error').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
};

export { onSubmitShowSuccessPopup, onSubmitShowErrorPopup };
