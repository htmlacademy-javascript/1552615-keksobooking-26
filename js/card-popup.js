import {createOffers, TYPES_TRANSLATE} from './data.js';
import { getEqualInObj } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const createdOffers = createOffers();
const offerListFragment = document.createDocumentFragment();

const createOfferCard = (offers) => {
  const offerElement = cardOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = offers.author.avatar;
  offerElement.querySelector('.popup__title').textContent = offers.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offers.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offers.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${offers.offer.rooms} комнаты для ${offers.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offers.offer.checkin}, выезд до ${offers.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = offers.offer.description;
  offerElement.querySelector('.popup__type').textContent = getEqualInObj(offers.offer.type, TYPES_TRANSLATE);
  const featureList = offerElement.querySelector('.popup__features');
  const featureListItem = featureList.querySelectorAll('.popup__feature');
  const offerFeatures = offers.offer.features.split(', ');
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
  const photos = offers.offer.photos.split(', ');

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
