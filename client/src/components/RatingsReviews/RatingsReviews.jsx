/* ---------------------------------
Library Dependencies + Subcomponents
--------------------------------- */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Subcomponents
import AddReview from './AddReview.jsx';
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

// Dummy product_id
const product_id = 16500;

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [sortBy, setSort] = useState('relevant');

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    axios.get(`/api/reviews/${product_id}`)
      .then((resp) => setAllReviews(resp.data.results))
      .then(() => setLoaded(true))
      .then(() => setNumReviews(allReviews.length))
      .catch((err) => console.log(err));
  }, [loaded]);

  // On change event handler to set sortBy state (<SortSelect />)
  const handleSelect = (e) => setSort(e.target.value);

  return (
    <div className="ratings-reviews">
      {/* <h3>Ratings & Reviews</h3>
      { /* Rating Breakdown */ }
      {/* <RatingBreakdown allReviews={allReviews} numReviews={numReviews} /> */}

      { /* Proudct Breakdown */ }
      <ProductBreakdown />

      { /* Sorting dropdown */ }
      {/* <div id="sortby">
        { `${numReviews} reviews sorted by ` }
        <SortSelect handleSelect={handleSelect} />
      </div> */}

      {/* Individual Review Tiles */}
      {/* <div>
        { allReviews.slice(0, 2).map((review) => <ReviewTile review={review} key={review.id} />) }
        { allReviews.slice(0, 2).map((review) => console.log(review)) }
      </div> */}

      { /* Add A Review + Modal */ }
      <AddReview />
    </div>
  );
}
