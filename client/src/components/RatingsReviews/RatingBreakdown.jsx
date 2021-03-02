import React, { useState, useEffect } from 'react';

export default function RatingBreakdown({ allReviews, reviewsCount }) {
  const [percentage, setPercentage] = useState(100);

  // On render + change in # of reviews calculate % of people who recommend
  useEffect(() => {
    let count = 0;

    allReviews.map((review) => {
      if (review.recommend) {
        count += 1;
      }
    });

    setPercentage(count / reviewsCount);
  }, [allReviews, reviewsCount]);


  return (
    <div id="RatingBreakdown">
      { reviewsCount === 0 ? null : (
        <div>{percentage}</div>
      ) }
    </div>
  );
}
