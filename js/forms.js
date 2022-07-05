import { setDisabledAttr, removeDisabledAttr } from './util.js';

const adFrom = document.querySelector('.ad-form');
const adFormElements = adFrom.querySelectorAll('.ad-form__element');
const adSlider = adForm.querySelector('.ad-form__slider');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const mapFeatures = mapFilter.querySelector('.map__features');

const disableForms = () => {
  adFrom.classList.add('ad-form--disabled');
  adSlider.setAttribute('disabled', 'disabled');
  mapFeatures.setAttribute('disabled', 'disabled');
  mapFilter.classList.add('map__filters--disabled');
  setDisabledAttr(adFormElements);
  setDisabledAttr(mapFilters);
};

const activateForms = () => {
  adFrom.classList.remove('ad-form--disabled');
  adSlider.removeAttribute('disabled', 'disabled');
  mapFeatures.removeAttribute('disabled', 'disabled');
  mapFilter.classList.remove('map__filters--disabled');
  removeDisabledAttr(adFormElements);
  removeDisabledAttr(mapFilters);
};

disableForms();

activateForms();
