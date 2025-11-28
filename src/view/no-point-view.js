import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createNoPointTemplate(filterType, isServerUnavailable) {
  const noPointTextValue = isServerUnavailable
    ? 'Failed to load latest route information'
    : NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
}

export default class NoPointView extends AbstractView {
  #filterType = null;
  #isServerUnavailable = false;

  constructor({ filterType, isServerUnavailable = false }) {
    super();
    this.#filterType = filterType;
    this.#isServerUnavailable = isServerUnavailable;
  }

  get template() {
    return createNoPointTemplate(this.#filterType, this.#isServerUnavailable);
  }
}
