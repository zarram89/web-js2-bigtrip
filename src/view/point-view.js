import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { offersByType } from '../mock/point.js';

function createPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = point;

  const date = dayjs(dateFrom).format('MMM D');
  const timeFrom = dayjs(dateFrom).format('HH:mm');
  const timeTo = dayjs(dateTo).format('HH:mm');
  const duration = dayjs(dateTo).diff(dayjs(dateFrom), 'minute'); // Simple duration for now

  // Format duration helper (simplified)
  const formatDuration = (minutes) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    let result = '';
    if (days > 0) {
      result += `${days}D `;
    }
    if (hours > 0) {
      result += `${hours}H `;
    }
    result += `${mins}M`;
    return result;
  };

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const typeOffers = offersByType.find((offer) => offer.type === type);
  const selectedOffers = typeOffers ? typeOffers.offers.filter((offer) => offers.includes(offer.id)) : [];

  const offersTemplate = selectedOffers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${formatDuration(duration)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  _callback = {};

  constructor({ point, destinations }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    // We need to resolve destination ID to name for display
    const destinationObj = this.#destinations.find((d) => d.id === this.#point.destination);
    this.#point.destinationName = destinationObj ? destinationObj.name : this.#point.destination;
  }

  get template() {
    return createPointTemplate({ ...this.#point, destination: this.#point.destinationName });
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
