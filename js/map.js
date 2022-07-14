import { disableForm, activateForm } from './ad-form.js';
import { getAddressFromMap, DEFAULT_MAP_SETTINGS } from './util.js';
import { createOfferCard } from './card-popup.js';
import { getData } from './api.js';

const address = document.querySelector('#address');

const MAIN_PIN_SETTINGS = {
  size: [52, 52],
  anchor: [26, 52]
};

const SIMPLE_PIN_SETTINGS = {
  size: [40, 40],
  anchor: [20, 40]
};

disableForm();

const activateFormOnMapLoad = () => {
  activateForm();
  address.value = getAddressFromMap(DEFAULT_MAP_SETTINGS);
};

const map = L.map('map-canvas')
  .on('load', activateFormOnMapLoad)
  .setView({
    lat: DEFAULT_MAP_SETTINGS.lat,
    lng: DEFAULT_MAP_SETTINGS.lng,
  }, DEFAULT_MAP_SETTINGS.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SETTINGS.size,
  iconAnchor: MAIN_PIN_SETTINGS.anchor,
});

const simplePin = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: SIMPLE_PIN_SETTINGS.size,
  iconAnchor: SIMPLE_PIN_SETTINGS.anchor,
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_MAP_SETTINGS.lat,
    lng: DEFAULT_MAP_SETTINGS.lng,
  },
  {
    draggable: true,
    icon: mainPin,
  }
);
const createMainPin = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    address.value = getAddressFromMap(evt.target.getLatLng());
  });
};
const resetMainPin = () => {
  const defaultLatLng = L.latLng(DEFAULT_MAP_SETTINGS.lat, DEFAULT_MAP_SETTINGS.lng);
  mainPinMarker.setLatLng(defaultLatLng);
  address.value = getAddressFromMap(DEFAULT_MAP_SETTINGS);
};

const createAdMarker = (offer) => {
  const { lat, lng } = offer.location;
  const adMarker = L.marker(
    {
      lat,
      lng
    },
    {
      icon: simplePin,
    },
  );
  adMarker
    .addTo(map)
    .bindPopup(createOfferCard(offer));
};

createMainPin();

getData((offers) => {
  offers.forEach((offer) => createAdMarker(offer));
});

export { resetMainPin};
