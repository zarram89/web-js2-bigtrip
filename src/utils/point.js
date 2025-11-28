import dayjs from 'dayjs';

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

export { isDatesEqual };
