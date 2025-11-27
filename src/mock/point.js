import { getRandomInteger, getRandomArrayElement, getRandomDate } from './utils.js';
import { POINT_TYPES, DESTINATIONS, DESCRIPTIONS, OFFERS } from './const.js';
import { nanoid } from 'nanoid';

const generateDescription = () => {
  const count = getRandomInteger(1, 5);
  const description = [];
  for (let i = 0; i < count; i++) {
    description.push(getRandomArrayElement(DESCRIPTIONS));
  }
  return description.join(' ');
};

const generatePictures = () => {
  const count = getRandomInteger(0, 5);
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push({
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    });
  }
  return pictures;
};

const generateDestination = () => ({
  id: nanoid(),
  description: generateDescription(),
  name: getRandomArrayElement(DESTINATIONS),
  pictures: generatePictures()
});

const generateOffer = (id) => ({
  id: id,
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(10, 200)
});

const generateOffersByType = () => {
  const offersByType = [];
  for (const type of POINT_TYPES) {
    const offers = [];
    const offersCount = getRandomInteger(0, 5);
    for (let i = 0; i < offersCount; i++) {
      offers.push(generateOffer(i + 1)); // Simple ID for now
    }
    offersByType.push({
      type: type,
      offers: offers
    });
  }
  return offersByType;
};

const offersByType = generateOffersByType();
const destinations = Array.from({ length: 10 }, generateDestination);

const generatePoint = () => {
  const type = getRandomArrayElement(POINT_TYPES);
  const typeOffers = offersByType.find((offer) => offer.type === type);
  const offerIds = [];
  if (typeOffers && typeOffers.offers.length > 0) {
    const count = getRandomInteger(0, typeOffers.offers.length);
    for (let i = 0; i < count; i++) {
      offerIds.push(typeOffers.offers[i].id);
    }
  }

  const destination = getRandomArrayElement(destinations);

  return {
    basePrice: getRandomInteger(100, 1000),
    dateFrom: getRandomDate(),
    dateTo: getRandomDate(), // Should be after dateFrom, but for now random is fine or I can fix it
    destination: destination.id,
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: offerIds,
    type: type
  };
};

export { generatePoint, offersByType, destinations };
