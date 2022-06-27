import {createOffers, TYPES_TRANSLATE} from './data.js';
import { getEqualInObj } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const offers = createOffers();
const offerListFragment = document.createDocumentFragment();

offers.forEach(({ author, offer }) => {
  const offerElement = cardOfferTemplate.cloneNode(true);

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__type').textContent = getEqualInObj(offer.type, TYPES_TRANSLATE);
  const featureList = offerElement.querySelector('.popup__features');
  const featureListItem = featureList.querySelectorAll('.popup__feature');
  const offerFeatures = offer.features.split(', ');
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
  const photos = offer.photos.split(', ');

  photos.forEach((photo) => {
    const photoListItem = offerPhotosList.querySelector('.popup__photo').cloneNode(true);
    photoListItem.src = photo;
    photoListFragment.appendChild(photoListItem);
  });
  offerPhotosList.querySelectorAll('.popup__photo')[0].remove();
  offerPhotosList.appendChild(photoListFragment);

  offerListFragment.appendChild(offerElement);
});

mapCanvas.appendChild(offerListFragment);
