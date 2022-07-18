const adForm = document.querySelector('.ad-form');

const pristine = new Pristine (adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

export {pristine, adForm};
