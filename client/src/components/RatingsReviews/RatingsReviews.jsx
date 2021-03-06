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

// Helper functions
import sortReviews from './sortReviews.js';

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews() {
  const productID = useContext(UserContext).id;
  const [loaded, setLoaded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [numReviews, setNumReviews] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewMetadata, setReviewMetadata] = useState(null);

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => setAllReviews(sortReviews(resp.data.results, 'relevant')))
        .then(() => axios.get(`/api/reviews/meta/${productID}`)
          .then((resp) => setReviewMetadata(resp.data)))
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
      <RatingBreakdown reviewMetadata={reviewMetadata} />
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
        <ReviewTile review={review} sort={sort}setAllReviews={setAllReviews} />
        )) }
        {/* { allReviews.slice(0, showCount).map((review) => (
        console.log(review)
        )) } */}
        <button type="button" onClick={() => setShowCount((prev) => prev + 2)}>
          { showCount === numReviews || showCount === numReviews + 1 ? null : 'Show More' }
        </button>
      </div>

      { /* Add A Review + Modal */ }
      <AddReview />
    </div>
  );
}
