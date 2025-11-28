import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteBoardElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(siteBoardElement, pointsModel);

const filters = generateFilter(pointsModel.getPoints());

render(new FilterView({ filters }), siteFilterElement);

boardPresenter.init();
