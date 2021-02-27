import React, { useState } from 'react';
import axios from 'axios';

// Import components
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';

export default function RatingsReviews(props) {
  // const [reviews, setReview] = useState([]);

  // // Get all reviews from Atellier API for specific product + set to intial state on mount
  // let product_id = 16821;
  // useEffect(
  //   () => {
  //     axios.get(`api/reviews/${product_id}`)
  //       .then((resp) => setReview(resp.data.results))
  //       .catch((err) => alert(err));
  //   },
  //   []
  // );

  return (
    <div className="ratings-reviews">
      <h3>Ratings & Reviews</h3>
      <SortSelect />
      <ReviewTile />
    </div>
  );
}