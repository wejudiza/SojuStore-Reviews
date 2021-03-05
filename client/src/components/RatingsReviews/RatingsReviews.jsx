/* eslint-disable quote-props */
/* -------------------------------
Libraries, Contexts, Subcomponents
------------------------------- */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dt from 'moment';

// Product Context
import { UserContext } from '../UserContext.jsx';

// Subcomponents
import AddReview from './AddReview.jsx';
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

// Custom Hooks + Helper Functions
import convertDate from './convertDate.js';

const productID = '16500';

const sortReviews = (reviews, method) => {
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
};

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews() {
  // const productID = useContext(UserContext).id;
  const [loaded, setLoaded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [numReviews, setNumReviews] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => setAllReviews(sortReviews(resp.data.results, 'relevant')))
        .then(() => setLoaded(true))
        .then(() => setNumReviews(allReviews.length))
        .catch((err) => console.log(err));
    }
  }, [productID, loaded]);

  // On change event handler to set sortBy state (<SortSelect />)
  const handleSelect = (e) => {
    setSort(e.target.value);
    setAllReviews(sortReviews(allReviews, e.target.value));
  };

  return (
    <div className="ratings-reviews">
      {/* <h3>Ratings & Reviews</h3>
      { /* Rating Breakdown */ }
      {/* <RatingBreakdown allReviews={allReviews} numReviews={numReviews} /> */}

      { /* Proudct Breakdown */ }
      {/* <ProductBreakdown /> */}

      { /* Sorting dropdown */ }
      <div id="sortby">
        { `${numReviews} reviews sorted by` }
        <SortSelect handleSelect={handleSelect} />
      </div>
      <br />

      {/* Individual Review Tiles */}
      <div>
        { allReviews.slice(0, showCount).map((review) => (
        <ReviewTile review={review} key={review.id} />
        )) }
        { allReviews.slice(0, showCount).map((review) => (
        console.log(review)
        )) }
        <button type="button" onClick={() => setShowCount((prev) => prev + 2)}>
          { showCount === numReviews || showCount === numReviews + 1 ? null : 'Show More' }
        </button>
      </div>

      { /* Add A Review + Modal */ }
      <AddReview />
    </div>
  );
}
