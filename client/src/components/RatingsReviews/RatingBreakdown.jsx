import React, { useState, useEffect } from 'react';
// import { Rating } from 'material-ui-star-rating';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';

// Helper function that computes WA of ratings
const getWA = (x, y) => {
  if (x.length === y.length) {
    return x.map((xVal, i) => xVal * y[i]).reduce((wa, val) => wa + val);
  }
}

export default function RatingBreakdown({ allReviews, numReviews }) {
  const [percentage, setPercentage] = useState(null);
  const [wa, setWA] = useState(null);
  const [reviewDist, setReviewDist] = useState({});
  const [reviewCount, setReviewCount] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  // On render + change in # of reviews calculate % of people who recommend
  useEffect(() => {
    let count = 0;

    // Tally tot # of recommendations & # of reviews per rating
    allReviews.map((review) => {
      reviewCount[review.rating] += 1;
      if (review.recommend) {
        count += 1;
      }
    });

    setReviewCount(reviewCount);
    setPercentage(Math.floor((count / numReviews) * 1000) / 10);

    // Calc # of reviews per rating distribution
    Object.keys(reviewCount).map((key) => {
      reviewDist[key] = (reviewCount[key] / numReviews) * 100;
    });

    setReviewDist(reviewDist);
    setWA(getWA(Object.keys(reviewCount), Object.values(reviewCount)) / numReviews);
  }, [numReviews]);

  return (
    <div id="RatingBreakdown">
      { numReviews === 0 ? null : (
        <div>
          <div id="avg-rating">
            <h1>{ wa.toFixed(1) }</h1>
            INSERT STAR COMPONENT ***
          </div>
          { /* Recommended % */ }
          <div id="%-recommend">
            {percentage}
            % of reviews recommend this product
          </div>
          <br />
          { /* Rating breakdown bars */ }
          { Object.keys(reviewDist).map(key => <RatingBreakdownBar rating={key} dist={reviewDist[key]} />) }
        </div>
        ) }
    </div>
  );
}
