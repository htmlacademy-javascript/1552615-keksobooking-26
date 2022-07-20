import { mapFilter } from './ad-form.js';

const PRICE_LIMITS = [10000, 50000];

const filterType = (ad) => {
  if (mapFilter.querySelector('#housing-type').value === 'any') {
    return true;
  }
  return ad.offer.type === mapFilter.querySelector('#housing-type').value;
};

const filterPrice = (ad) => {
  const priceField = mapFilter.querySelector('#housing-price');
  if (priceField.value === 'any') {
    return true;
  }
  if (priceField.value === 'low' && ad.offer.price < PRICE_LIMITS[0]) {
    return true;
  } else if (priceField.value === 'middle' && PRICE_LIMITS[1] <= ad.offer.price < PRICE_LIMITS[1]) {
    return true;
  } else if (priceField.value === 'high' && ad.offer.price >= PRICE_LIMITS[1]) {
    return true;
  }
};

const filterRooms = (ad) => {
  if (mapFilter.querySelector('#housing-rooms').value === 'any') {
    return true;
  }
  return parseInt(ad.offer.rooms, 10) === parseInt(mapFilter.querySelector('#housing-rooms').value, 10);
};

const filterGuests = (ad) => {
  if (mapFilter.querySelector('#housing-guests').value === 'any') {
    return true;
  }
  return parseInt(ad.offer.guests, 10) === parseInt(mapFilter.querySelector('#housing-guests').value, 10);
};

const filterFeature = (ad) => {
  const checkedMapFeatures = mapFilter.querySelectorAll('.map__checkbox:checked');
  if (!checkedMapFeatures) {
    return true;
  }
  for (const feature of checkedMapFeatures) {
    if(!ad.offer.features || !ad.offer.features.includes(feature.value)) {
      return false;
    }
  }
  return true;
};

const offersFilter = (ad) =>
  ad.filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeature);

export { offersFilter };
