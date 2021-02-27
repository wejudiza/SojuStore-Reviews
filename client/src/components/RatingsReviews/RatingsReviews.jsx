import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';

export default function RatingsReviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let product_id = 16821;

  // Get all reviews from Atellier API for specific product + set to intial state on mount
  useEffect(() => {
    axios.get(`/api/reviews/${product_id}`)
      .then((resp) => setAllReviews(resp.data.results))
      .then(() => setLoaded(true))
      .catch((err) => alert(err));
  }, [loaded]);

  return (
    <div className="ratings-reviews">
      <h3>Ratings & Reviews</h3>
      <SortSelect />
      {/* Individual Review Tiles */}
      { allReviews.map((review) => <ReviewTile review={review} key={review.id} />) }
      { allReviews.map((review) => console.log(review)) }
    </div>
  );
}