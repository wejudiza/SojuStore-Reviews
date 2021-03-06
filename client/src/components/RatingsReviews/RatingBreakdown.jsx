/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

// Subcomponents
import RatingStars from './RatingStars.jsx';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';

// Helper function that computes WA of ratings
const getWA = (metadata) => {
  const { ratings } = metadata;
  const waArray = Object.keys(ratings).map((key) => Number(key) * Number(ratings[key]));
  const total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
  const wa = waArray.reduce((sum, val) => sum + val) / total;
  return wa;
};

const getRecommneded = (metadata) => {
  const { recommended } = metadata;
  const yes = Number(recommended.true);
  const no = Number(recommended.false);
  return yes / (yes + no);
};

export default function RatingBreakdown({ reviewMetadata }) {
  const [wa, setWA] = useState(0);
  const [recommended, setRecommended] = useState();

  useEffect(() => {
    if (reviewMetadata) {
      setWA(getWA(reviewMetadata));
      setRecommended(getRecommneded(reviewMetadata));
    }

    console.log(recommended);
  }, [reviewMetadata]);

  return (
    <div id="rating-reakdown">
      { JSON.stringify(reviewMetadata) }
      <div id="avg-rating">
        <h1>{ wa.toFixed(1) }</h1>
        <RatingStars rating={wa} size="25px" color="#f8ce0b" />
      </div>
      <div id="percent-recommend">
        {/* {`${recommended.toFixed(0)} % of reviews recommend this product` */}
      </div>
    </div>
  );
}

// <div id="RatingBreakdown">
// { numReviews === 0 ? null : (
//   <div>
//     { /* Combined rating score + star component */ }
//     { /* Recommended % */ }
//
//     <br />
//     { /* Rating breakdown bars */ }
//     { Object.keys(reviewDist).map((key) => (
//       <RatingBreakdownBar key={key} rating={key} dist={reviewDist[key]} />
//     )) }
//   </div>
// ) }
// </div>