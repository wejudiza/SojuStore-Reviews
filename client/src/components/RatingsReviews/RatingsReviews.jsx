/* -------------------------------
Libraries, Contexts, Subcomponents
------------------------------- */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Product Context
import { UserContext } from '../UserContext.jsx';

// Subcomponents
import AddReview from './AddReview.jsx';
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

// Custom hooks + helper functions
import useFilter from './useFilter.js';
import sortReviews from './sortReviews.js';

const productID = "16500";

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews() {
  // const productID = useContext(UserContext).id;
  const [loaded, setLoaded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  const [reviewMetadata, setReviewMetadata] = useState(null);
  const [filters, setFilters] = useFilter(new Set(['5', '4', '3', '2', '1']));

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => setAllReviews(sortReviews(resp.data.results, 'relevant')))
        .then(() => setReviews(allReviews))
        .then(() => axios.get(`/api/reviews/meta/${productID}`)
          .then((resp) => setReviewMetadata(resp.data)))
        .then(() => setLoaded(true))
        .then(() => setNumReviews(allReviews.length))
        .catch((err) => console.log(err));
    }
  }, [productID, loaded]);

  useEffect(() => {
    setNumReviews(allReviews.length);
  }, [allReviews]);

  // On change event handler to set sortBy state (<SortSelect />)
  const handleSelect = (e) => {
    setSort(e.target.value);
    setAllReviews(sortReviews(allReviews, e.target.value));
  };

  const handleFilter = (rating) => {
    setFilters(rating);
    const filteredReviews = reviews.filter((review) => filters.has(review.rating.toString()));
    setAllReviews(filteredReviews);
  };

  return (
    <div className="ratings-reviews">
      <h3>Ratings & Reviews</h3>
      { /* Rating Breakdown */ }
      <RatingBreakdown reviewMetadata={reviewMetadata} handleFilter={handleFilter} />
      { /* Proudct Breakdown */ }
      <ProductBreakdown />

      { /* Sorting dropdown */ }
      <div id="sortby">
        { `${numReviews} reviews sorted by` }
        <SortSelect numReviews={numReviews} handleSelect={handleSelect} />
      </div>
      <br />

      {/* Individual Review Tiles */}
      <div>
        { allReviews.slice(0, showCount).map((review, key) => (
        <ReviewTile review={review} sort={sort} setAllReviews={setAllReviews} key={review.review_id} />
        )) }
        <button type="button" onClick={() => setShowCount((prev) => prev + 2)}>
          { showCount === numReviews || showCount === numReviews + 1 ? null : 'Show More' }
        </button>
      </div>

      { /* Add A Review + Modal */ }
      <AddReview reviewMetadata={reviewMetadata} />
    </div>
  );
}
