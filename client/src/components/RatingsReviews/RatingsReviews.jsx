import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

// Dummy product_id
const product_id = 16821;

// Helper function to calculate

export default function RatingsReviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [sortBy, setSort] = useState('relevant');

  // Get all reviews from Atellier API for specific product + set to intial state on mount
  useEffect(() => {
    axios.get(`/api/reviews/${product_id}`)
      .then((resp) => setAllReviews(resp.data.results))
      .then(() => setLoaded(true))
      .then(() => setNumReviews(allReviews.length))
      .catch((err) => console.log(err));
  }, [product_id, loaded]);

  // On change event to set sortBy state
  const handleSelect = (e) => setSort(e.target.value);

  return (
    <div className="ratings-reviews">
      <h3>Ratings & Reviews</h3>
      { /* Rating Breakdown */ }
      <RatingBreakdown allReviews={allReviews} numReviews={numReviews} />
      { /* Sorting dropdown */ }
      <div id="sortby">
        { `${numReviews} reviews sorted by ` }
        <SortSelect handleSelect={handleSelect} />
      </div>
      {/* Individual Review Tiles */}
      <div>
        {/* { allReviews.slice(0, 2).map((review) => <ReviewTile review={review} key={review.id} />) } */}
        {/* { allReviews.slice(0, 2).map((review) => console.log(review)) } */}
      </div>
    </div>
  );
}
