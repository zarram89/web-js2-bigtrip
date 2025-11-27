import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
    boardComponent = new EventListView();

    init(boardContainer) {
        this.boardContainer = boardContainer;

        render(new SortView(), this.boardContainer);
        render(this.boardComponent, this.boardContainer);
        render(new EditPointView(), this.boardComponent.getElement());

        for (let i = 0; i < 3; i++) {
            render(new PointView(), this.boardComponent.getElement());
        }
    }
}
