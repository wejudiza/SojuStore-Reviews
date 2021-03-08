import React, { useState } from 'react';

/* -------------
Helper Functions
------------- */
// Converts rating (0-5) to a percentage (0%-100%)
const getPercentage = (rating) => rating * 20;

// Rounds rating to nearest 1/4 (typically output of getPercentage)
const roundToFourth = (rating) => (Math.round(rating * 4) / 4).toFixed(2);

/* -------------------
Rating Stars Component
------------------- */
export default function RatingStars({ rating, size, color }) {
  rating = `${roundToFourth(getPercentage(rating))}%`;
  return (
    <div className="rating-stars-outer" style={{ fontSize: size }}>
      <div className="rating-stars-inner" style={{ width: rating, fontSize: size, color }} />
    </div>
  );
}
