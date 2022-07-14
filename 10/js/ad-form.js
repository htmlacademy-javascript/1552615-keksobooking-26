import { setDisabledAttr, removeDisabledAttr, getAddressFromMap, DEFAULT_MAP_SETTINGS } from './util.js';
import { adForm } from './forms-validate/create-pristine.js';
import './forms-validate/validate-title.js';
import './forms-validate/validate-price.js';
import './forms-validate/validate-rooms.js';
import './forms-validate/validate-time.js';

const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adSlider = adForm.querySelector('.ad-form__slider');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const mapFeaturesField = mapFilter.querySelector('.map__features');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  adSlider.setAttribute('disabled', 'disabled');
  mapFeaturesField.setAttribute('disabled', 'disabled');
  mapFilter.classList.add('map__filters--disabled');
  setDisabledAttr(adFormElements);
  setDisabledAttr(mapFilters);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adSlider.removeAttribute('disabled', 'disabled');
  mapFeaturesField.removeAttribute('disabled', 'disabled');
  mapFilter.classList.remove('map__filters--disabled');
  removeDisabledAttr(adFormElements);
  removeDisabledAttr(mapFilters);
};

const resetAdForm = () => {
  adForm.reset();
  adForm.querySelector('#address').value = getAddressFromMap(DEFAULT_MAP_SETTINGS);
  const adFormFeatures = adForm.querySelectorAll('features__checkbox');
  adFormFeatures.forEach((feature) => {
    feature.checked = false;
  });
};
const resetFilterForm = () => {
  const mapFeatures = mapFilter.querySelectorAll('input[name="features"]');
  mapFeatures.forEach((feature) => {
    feature.checked = false;
  });
  mapFilter.reset();
};

const resetForms = () => {
  resetAdForm();
  resetFilterForm();
};

export { disableForm, activateForm, resetForms };
