/* eslint-disable quote-props */
import dt from 'moment';

export default function sortReviews(reviews, method) {
  const methods = {
    'newest': (a, b) => (dt(a.date).isAfter(b.date) ? 1 : -1),
    'helpful': (a, b) => (a.helpfulness < b.helpfulness ? 1 : -1),
    'relevant': (a, b) => {
      const aScore = Math.exp(a.helpfulness / 10) * (Math.exp(dt().diff(dt(a.date), 'days') * (1 / 1000)));
      const bScore = Math.exp(b.helpfulness / 10) * (Math.exp(dt().diff(dt(b.date), 'days') * (1 / 1000)));
      return (aScore < bScore ? 1 : -1);
    },
  };

  return reviews.sort(methods[method]);
}
