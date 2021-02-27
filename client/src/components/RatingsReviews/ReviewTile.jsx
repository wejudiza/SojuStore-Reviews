import React, { useState } from 'react';
import axios from 'axios';
// import ReviewSummary from './ReviewSummary';

export default function ReviewTile(props) {
  const [review, setReview] = useState();

  // product_id: props.product_id
  // Get reviews from Atellier API for specific product + set to state
  let product_id = 16821;
  axios.get(`api/reviews/${product_id}`)
    .then((resp) => setReview(resp.data))
    .catch((err) => alert(err));

  return (
    <div></div>
  );
}
