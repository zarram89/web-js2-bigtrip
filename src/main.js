import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteBoardElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();

render(new FilterView(), siteFilterElement);

boardPresenter.init(siteBoardElement);
