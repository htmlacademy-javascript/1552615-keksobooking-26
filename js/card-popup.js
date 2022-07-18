import { getEqualInObj } from './util.js';

const TYPES_TRANSLATE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const cardOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const createOfferCard = ({author, offer}) => {
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
  featureListItem.forEach((item) => {
    if(offer.features) {
      const isNecessary = offer.features.some(
        (offerFeature) => item.classList.contains(`popup__feature--${offerFeature}`)
      );
      if (!isNecessary) {
        item.remove();
      }
    } else {
      featureList.remove();
    }
  });

  const offerPhotosList = offerElement.querySelector('.popup__photos');
  const photoListFragment = document.createDocumentFragment();

  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoListItem = offerPhotosList.querySelector('.popup__photo').cloneNode(true);
      photoListItem.src = photo;
      photoListFragment.appendChild(photoListItem);
    });
    offerPhotosList.querySelectorAll('.popup__photo')[0].remove();
    offerPhotosList.appendChild(photoListFragment);
  } else {
    offerPhotosList.remove();
  }
  return offerElement;
};

export { createOfferCard };
