import React, { useState, useEffect } from 'react';

export default function RatingBreakdown({ allReviews, reviewsCount }) {
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    let count = 0;
    allReviews.map((review) => {
      if (reivew.recommend)
    });
  }, [allReviews]);

  return (
    <div id="RatingBreakdown">
      { reviewsCount === 0 ? null : (
        <div></div>
      ) }
    </div>
  );
}
