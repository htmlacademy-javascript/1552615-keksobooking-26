import { disableForm, activateForm } from './ad-form.js';
import { getAddressFromMap, DEFAULT_MAP_SETTINGS } from './util.js';
import { createOfferCard } from './card-popup.js';
import { getData } from './api.js';
import { offersFilter } from './filter.js';

const address = document.querySelector('#address');

const MAIN_PIN_SETTINGS = {
  size: [52, 52],
  anchor: [26, 52]
};

const SIMPLE_PIN_SETTINGS = {
  size: [40, 40],
  anchor: [20, 40]
};
const OFFERS_MIN_COUNT = 0;
const OFFERS_MAX_COUNT = 10;
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

const markerGroup = L.layerGroup().addTo(map);

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
    .addTo(markerGroup)
    .bindPopup(createOfferCard(offer));
};

createMainPin();

const createOfferMarkers = () => {
  getData((offers) => {
    markerGroup.clearLayers();
    offersFilter(offers)
      .slice(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT)
      .forEach((offer) => createAdMarker(offer));
  });
};

createOfferMarkers();

document.querySelectorAll('.map__filter').forEach((filter) => {
  filter.addEventListener('change', createOfferMarkers);
});
document.querySelectorAll('.map__checkbox').forEach((el) => {
  el.addEventListener('change', createOfferMarkers);
});

export { resetMainPin };
