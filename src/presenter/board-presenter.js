import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';
import { destinations } from '../mock/point.js'; // Import destinations for now

export default class BoardPresenter {
  boardComponent = new EventListView();

  init(boardContainer, pointsModel) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);

    // Render first point as edit form
    render(new EditPointView({ point: this.boardPoints[0] }), this.boardComponent.getElement());

    // Render rest of the points
    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({ point: this.boardPoints[i], destinations: destinations }), this.boardComponent.getElement());
    }
  }
}
