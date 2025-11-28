import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic eo0w590ik29889a';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const newEventButtonComponent = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFiltersElement,
  filterModel,
  pointsModel,
});

const handleNewEventFormClose = () => {
  newEventButtonComponent.disabled = false;
};

const handleNewEventButtonClick = () => {
  boardPresenter.createPoint(handleNewEventFormClose);
  newEventButtonComponent.disabled = true;
};

newEventButtonComponent.addEventListener('click', handleNewEventButtonClick);

filterPresenter.init();
boardPresenter.init();
pointsModel.init();
