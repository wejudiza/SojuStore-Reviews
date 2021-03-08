/* -------------------------------
Libraries, Contexts, Subcomponents
------------------------------- */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Product Context
import { UserContext } from '../UserContext.jsx';

// Subcomponents
import Search from './Search.jsx';
import AddReview from './AddReview.jsx';
import SortSelect from './SortSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

// Custom hooks + helper functions
import useFilter from './useFilter.js';
import useSearch from './useSearch.js';
import sortReviews from './sortReviews.js';

const productID = "16500";

const initialFilters = {
  5: true,
  4: true,
  3: true,
  2: true,
  1: true,
};


// const convertDate = (date) => {
//   const pattern = /\d{4}-\d{2}-\d{2}/;
//   const oldDate = date.match(pattern)[0];
//   const newDate = dt(oldDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
//   return newDate;
// };

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
  const [filters, setFilters] = useFilter(initialFilters);
  const [search, setSearch] = useSearch({ text: '', count: 0 });

  // Get all reviews from Atellier API for specific product + assign to state once loaded
  useEffect(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => setAllReviews(sortReviews(resp.data.results, sort)))
        .then(() => setReviews(allReviews))
        .then(() => axios.get(`/api/reviews/meta/${productID}`)
          .then((resp) => setReviewMetadata(resp.data)))
        .then(() => setLoaded(true))
        .then(() => setNumReviews(allReviews.length))
        .catch((err) => console.log(err));
    }
  }, [productID, loaded]);

  useEffect(() => {
    setReviews(sortReviews(reviews, sort));
  }, [sort]);

  useEffect(() => {
    setNumReviews(allReviews.length);
  }, [allReviews]);

  useEffect(() => {
    if (search.count > 3) {
      const searchResults = allReviews.filter((review) => review.body.match(`${search.text}`));
      setAllReviews(searchResults);
    } else {
      setAllReviews(sortReviews(reviews, sort));
    }
  }, [search]);

  // On change event handler to set sortBy state (<SortSelect />)
  const handleSelect = (e) => {
    setSort(e.target.value);
    setAllReviews(sortReviews(allReviews, e.target.value));
  };

  const handleFilter = (rating) => {
    setFilters(rating);
    let appliedFilters = Object.keys(filters).filter((key) => filters[key]);
    if (appliedFilters.length === 0) {
      setAllReviews(reviews);
    } else {
      const filteredReviews = reviews.filter((review) => appliedFilters.includes(review.rating.toString()));
      setAllReviews(filteredReviews);
    }
  };

  return (
    <div id="ratings-reviews">
      <div id="sidebar">
        <div id="title">Ratings & Reviews</div>
        <RatingBreakdown reviewMetadata={reviewMetadata} handleFilter={handleFilter} />
        <ProductBreakdown />
      </div>
      <div className="reviews-main">
        { /* Sorting dropdown */ }
        <div id="sortby">
          { `${numReviews} reviews sorted by` }
          <SortSelect numReviews={numReviews} handleSelect={handleSelect} />
        </div>
        <Search setSearch={setSearch} />

        {/* Individual Review Tiles */}
        <div id="review-list">
          { allReviews.slice(0, showCount).map((review) => (
            <ReviewTile
              review={review}
              sort={sort}
              setAllReviews={setAllReviews}
              key={review.review_id}
            />
          )) }
        </div>
        <div id="footer-buttons">
          { showCount === numReviews || showCount === numReviews + 1 ? null : (
            <button type="button" onClick={() => setShowCount((prev) => prev + 2)}>Show More</button>
          ) }
          <AddReview metadata={reviewMetadata} />
        </div>
      </div>
    </div>
  );
}
