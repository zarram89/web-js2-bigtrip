import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace } from '../framework/render.js';
import { destinations } from '../mock/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new EventListView();
  #boardPoints = [];

  init(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.getPoints()];

    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#boardContainer);
    } else {
      render(new SortView(), this.#boardContainer);
      render(this.#boardComponent, this.#boardContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({ point, destinations });
    const pointEditComponent = new EditPointView({ point });

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
      }
    }

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    pointEditComponent.setRollupClickHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#boardComponent.element);
  }
}
