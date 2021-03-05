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

const productID = '16500';

// const sortReviews = (reviews, method) => {
//   methods = {
//     'relevant': (a, b) => ,
//     'newest': (a, b) => ,
//     'helpful': (a, b) =>
//   }
// }

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews() {
  // const productID = useContext(UserContext).id;
  const [loaded, setLoaded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [sortBy, setSort] = useState('relevant');
  const [numReviews, setNumReviews] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => setAllReviews(resp.data.results))
        .then(() => setLoaded(true))
        .then(() => setNumReviews(allReviews.length))
        .catch((err) => console.log(err));
    }
  }, [productID]);

  // On change event handler to set sortBy state (<SortSelect />)
  const handleSelect = (e) => setSort(e.target.value);

  return (
    <div className="ratings-reviews">
      {/* <h3>Ratings & Reviews</h3>
      { /* Rating Breakdown */ }
      {/* <RatingBreakdown allReviews={allReviews} numReviews={numReviews} /> */}

      { /* Proudct Breakdown */ }
      {/* <ProductBreakdown /> */}

      { /* Sorting dropdown */ }
      <div id="sortby">
        { `${numReviews} reviews sorted by ` }
        <SortSelect handleSelect={handleSelect} />
      </div>

      {/* Individual Review Tiles */}
      <div>
        { allReviews.slice(0, showCount).map((review) => (
        <ReviewTile review={review} key={review.id} />
        )) }
        <button type="button" onClick={() => setShowCount((prev) => prev + 2)}>
          { showCount === numReviews || showCount === numReviews + 1 ? null : 'Show More' }
        </button>
      </div>

      { /* Add A Review + Modal */ }
      { /* <AddReview /> */ }
    </div>
  );
}
