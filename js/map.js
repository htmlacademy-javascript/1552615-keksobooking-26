import { disableForm, activateForm } from './forms.js';
import { getAddressFromMap } from './util.js';
import { createOffers } from './data.js';
import { createOfferCard } from './card-popup.js';

const address = document.querySelector('#address');

const DEFAULT_MAP_SETTINGS = {
  lat: 35.6894,
  lng: 139.692,
  scale: 12
};
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
  address.value = getAddressFromMap (DEFAULT_MAP_SETTINGS);
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

const mainPin = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: MAIN_PIN_SETTINGS.size,
  iconAnchor: MAIN_PIN_SETTINGS.anchor,
});

const simplePin = L.icon ({
  iconUrl: '../img/pin.svg',
  iconSize: SIMPLE_PIN_SETTINGS.size,
  iconAnchor: SIMPLE_PIN_SETTINGS.anchor,
});

const createMainPin = () => {
  getAddressFromMap (DEFAULT_MAP_SETTINGS);
  const mainPinMarker = L.marker (
    {
      lat: DEFAULT_MAP_SETTINGS.lat,
      lng: DEFAULT_MAP_SETTINGS.lng,
    },
    {
      draggable: true,
      icon: mainPin,
    }
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    address.value = getAddressFromMap(evt.target.getLatLng());
  });
};

const createdOffers = createOffers();

const createAdMarker = (offer) => {
  const {lat, lng} = offer.location;
  const adMarker = L.marker (
    {
      lat,
      lng
    },
    {
      simplePin,
    },
  );
  adMarker
    .addTo(map)
    .bindPopup(createOfferCard(offer));
};

createMainPin();

createdOffers.forEach((offer) => {
  createAdMarker(offer);
});
