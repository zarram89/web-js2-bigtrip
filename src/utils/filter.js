import dayjs from 'dayjs';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const isFuture = (dateFrom) => dateFrom && (dayjs().isBefore(dateFrom, 'D') || dayjs().isSame(dateFrom, 'D'));
const isPresent = (dateFrom, dateTo) => dateFrom && dateTo && (dayjs().isAfter(dateFrom, 'D') || dayjs().isSame(dateFrom, 'D')) && (dayjs().isBefore(dateTo, 'D') || dayjs().isSame(dateTo, 'D'));
const isPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};

export { filter, FilterType };
