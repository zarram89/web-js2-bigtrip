import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { sortByDay } from '../utils/sort.js';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ tripInfoContainer, pointsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#pointsModel.points;
    const offers = this.#pointsModel.offers;

    if (points.length === 0) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
      }
      return;
    }

    const sortedPoints = [...points].sort(sortByDay);

    const tripTitle = this.#getTripTitle(sortedPoints);
    const tripDates = this.#getTripDates(sortedPoints);
    const tripCost = this.#getTripCost(points, offers);

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      tripTitle,
      tripDates,
      tripCost,
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getTripTitle(points) {
    const destinationNames = points.map((point) => {
      const destination = this.#pointsModel.destinations.find((d) => d.id === point.destination);
      return destination ? destination.name : '';
    });

    if (destinationNames.length > 3) {
      return `${destinationNames[0]} &mdash; ... &mdash; ${destinationNames[destinationNames.length - 1]}`;
    }

    return destinationNames.join(' &mdash; ');
  }

  #getTripDates(points) {
    if (points.length === 0) {
      return '';
    }

    const startDate = points[0].dateFrom;
    const endDate = points[points.length - 1].dateTo;

    return `${dayjs(startDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endDate).format('MMM D')}`;
  }

  #getTripCost(points, allOffers) {
    return points.reduce((total, point) => {
      let cost = point.basePrice;

      const typeOffers = allOffers.find((offer) => offer.type === point.type);
      if (typeOffers) {
        const selectedOffers = typeOffers.offers.filter((offer) => point.offers.includes(offer.id));
        selectedOffers.forEach((offer) => {
          cost += offer.price;
        });
      }

      return total + cost;
    }, 0);
  }
}
