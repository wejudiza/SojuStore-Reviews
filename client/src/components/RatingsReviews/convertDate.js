import dt from 'moment';

export default function convertDate(date) {
  const pattern = /\d{4}-\d{2}-\d{2}/;
  const oldDate = date.match(pattern)[0];
  const newDate = dt(oldDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
  return newDate;
}
