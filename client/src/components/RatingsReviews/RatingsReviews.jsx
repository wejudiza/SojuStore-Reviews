/* -------------------------------
Libraries, Contexts, Subcomponents
------------------------------- */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

// Product Context
import { UserClick } from '../UserClick.js';
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

const initialFilters = {
  5: true,
  4: true,
  3: true,
  2: true,
  1: true,
};

/* ------------------------
Ratings & Reviews Component
------------------------ */
export default function RatingsReviews({ widget }) {
  const productID = useContext(UserContext).id;
  const sendClickInfo = useContext(UserClick);
  const [loaded, setLoaded] = useState(false);
  const [showCount, setShowCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  const [reviewMetadata, setReviewMetadata] = useState(null);
  const [filters, setFilters] = useFilter(initialFilters);
  const [search, setSearch] = useSearch({ text: '', count: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [barColors, setBarColors] = useState(false);

  // Gets all reviews + metadata from API for specific product, sets relevant intial states
  useMemo(() => {
    if (productID) {
      axios.get(`/api/reviews/${productID}`)
        .then((resp) => {
          setAllReviews(sortReviews(resp.data.results, sort));
          setReviews(sortReviews(resp.data.results, sort));
        })
        .then(() => axios.get(`/api/reviews/meta/${productID}`)
          .then((resp) => setReviewMetadata(resp.data)))
        .catch((err) => console.log(err));
    }
  }, [productID]);

  // Copy of all reviews w/ current sort state that can be reloaded if filters are cleared
  useEffect(() => setReviews(sortReviews(reviews, sort)), [sort]);

  // Keeps track of rendered reviews count
  useEffect(() => setNumReviews(allReviews.length), [allReviews]);

  // Filters renders reviews based on user search
  useEffect(() => {
    if (search.count > 3) {
      const searchResults = allReviews.filter((review) => review.body.match(`${search.text}`));
      setAllReviews(searchResults);
    } else {
      setAllReviews(sortReviews(reviews, sort));
    }
  }, [search]);

  // Keeps tracks of current sort option
  const handleSelect = (e) => {
    setSort(e.target.value);
    setAllReviews(sortReviews(allReviews, e.target.value));
  };

  // Filters rendered reviews based on rating breakdown click events
  const handleFilter = (rating) => {
    setFilters(rating);
    const appliedFilters = Object.keys(filters).filter((key) => filters[key]);
    console.log(appliedFilters);
    if (appliedFilters.length === 0) {
      setAllReviews(reviews);
      setBarColors(!barColors);
    } else {
      const filteredReviews = reviews.filter((review) => appliedFilters.includes(review.rating.toString()));
      setAllReviews(filteredReviews);
    }
  };

  return (
    <div id="ratings-reviews">
      { /* Sidebar */ }
      <div id="sidebar">
        <div id="title">Ratings & Reviews</div>
        <div id="rating-breakdown" onClick={(e) => sendClickInfo(e, widget)}>
          <RatingBreakdown
            reviewMetadata={reviewMetadata}
            barColors={barColors}
            handleFilter={handleFilter}
            onClick={(e) => sendClickInfo(e, widget)}
          />
        </div>
        <div id="product-breakdown" onClick={(e) => sendClickInfo(e, widget)}>
          <ProductBreakdown isOpen={isOpen} />
        </div>
      </div>
      { /* Main Review Section */ }
      <div id="reviews-main">
        <div id="reviews-main-header">
          <div id="reviews-sortby" onClick={(e) => sendClickInfo(e, widget)}>
            { `${numReviews} reviews sorted by` }
            <SortSelect numReviews={numReviews} handleSelect={handleSelect} />
          </div>
          <Search setSearch={setSearch} />
        </div>
        {/* Review List - dynmically renders out individual tiles */}
        <div id="review-list" onClick={(e) => sendClickInfo(e, widget)}>
          { allReviews.slice(0, showCount).map((review) => (
            <ReviewTile
              widget={widget}
              review={review}
              sort={sort}
              setAllReviews={setAllReviews}
              sendClickInfo={sendClickInfo}
              key={review.review_id}
            />
          )) }
        </div>
        { /* Footer Buttons - Add Review + Show More */ }
        <div id="footer-buttons">
          <AddReview metadata={reviewMetadata} isOpen={isOpen} setIsOpen={setIsOpen} />
          { showCount === numReviews || showCount === numReviews + 1 ? null : (
            <button id="show-more-btn" type="button" onClick={() => setShowCount((prev) => prev + 2)}>Show More</button>
          ) }
        </div>
      </div>
    </div>
  );
}
