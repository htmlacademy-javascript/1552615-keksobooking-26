import {createOffers, TYPES_TRANSLATE} from './data.js';
import { getEqualInObj } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const createdOffers = createOffers();
const offerListFragment = document.createDocumentFragment();

const createOfferCard = (advertise) => {
  const offerElement = cardOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = advertise.author.avatar;
  offerElement.querySelector('.popup__title').textContent = advertise.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = advertise.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${advertise.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${advertise.offer.rooms} комнаты для ${advertise.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertise.offer.checkin}, выезд до ${advertise.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = advertise.offer.description;
  offerElement.querySelector('.popup__type').textContent = getEqualInObj(advertise.offer.type, TYPES_TRANSLATE);
  const featureList = offerElement.querySelector('.popup__features');
  const featureListItem = featureList.querySelectorAll('.popup__feature');
  const offerFeatures = advertise.offer.features.split(', ');
  featureListItem.forEach((item) => {
    const isNecessary = offerFeatures.some(
      (offerFeature) => item.classList.contains(`popup__feature--${offerFeature}`)
    );
    if (!isNecessary) {
      item.remove();
    }
  });

  const offerPhotosList = offerElement.querySelector('.popup__photos');
  const photoListFragment = document.createDocumentFragment();
  const photos = advertise.offer.photos.split(', ');

  photos.forEach((photo) => {
    const photoListItem = offerPhotosList.querySelector('.popup__photo').cloneNode(true);
    photoListItem.src = photo;
    photoListFragment.appendChild(photoListItem);
  });
  offerPhotosList.querySelectorAll('.popup__photo')[0].remove();
  offerPhotosList.appendChild(photoListFragment);

  return offerElement;
};

const offerCard = createOfferCard(createdOffers[0]);

offerListFragment.appendChild(offerCard);

mapCanvas.appendChild(offerListFragment);
