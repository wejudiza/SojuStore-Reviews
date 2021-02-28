import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';

// Dummy product_id
const product_id = 16821;

export default function RatingsReviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reviewsCount, setReviewsCount] = useState();
  const [sortBy, setSort] = useState('relevant');

  // Get all reviews from Atellier API for specific product + set to intial state on mount
  useEffect(() => {
    axios.get(`/api/reviews/${product_id}`)
      .then((resp) => setAllReviews(resp.data.results))
      .then(() => setLoaded(true))
      .then(() => setReviewsCount(allReviews.length))
      .catch((err) => alert(err));
  }, [loaded]);

  // On change event to set sortBy state
  const handleSelect = (e) => setSort(e.target.value);

  return (
    <div className="ratings-reviews">
      <h3>Ratings & Reviews</h3>
      { /* Sorting dropdown */ }
      <div id="sortby">
        { `${reviewsCount} reviews sorted by ` }
        <SortSelect handleSelect={handleSelect} />
      </div>
      {/* Individual Review Tiles */}
      { allReviews.map((review) => <ReviewTile review={review} key={review.id} />) }
    </div>
  );
}
