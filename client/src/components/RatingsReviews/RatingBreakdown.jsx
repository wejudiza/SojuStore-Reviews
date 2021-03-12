/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

// Subcomponents
import RatingStars from './RatingStars.jsx';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';

// Helper function that computes WA of ratings
const getWA = (metadata) => {
  const { ratings } = metadata;
  const waArray = Object.keys(ratings).map((key) => Number(key) * Number(ratings[key]));
  if (Object.values(ratings).length > 1) {
    let total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
    total = total === 0 ? 1 : total;
    let wa = waArray.reduce((sum, val) => sum + val) / total;
    wa = wa ?? 0;
    return wa;
  }
};

const getDistribution = (metadata) => {
  const dist = {};
  const { ratings } = metadata;
  if (Object.values(ratings).length > 1) {
    let total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
    total = total === 0 ? 1 : total;
    Object.keys(ratings).map((key) => dist[key] = Number(ratings[key] ?? 0) / total * 100);
    return dist;
  }
};

const getRecommneded = (metadata) => {
  if (metadata.recommended) {
    const { recommended } = metadata;
    const yes = !recommended.true ? 0 : Number(recommended.true);
    const no = !recommended.false ? 0 : Number(recommended.false);
    let percent = yes / (yes + no) * 100;
    percent = !percent || percent == null ? 0 : percent;
    return percent;
  }
};

export default function RatingBreakdown(props) {
  const { reviewMetadata, barColors, handleFilter } = props;
  const [wa, setWA] = useState(0);
  const [ratingDist, setRatingDist] = useState({});
  const [recommended, setRecommended] = useState(0);

  useEffect(() => {
    if (reviewMetadata) {
      setWA(getWA(reviewMetadata));
      setRatingDist(getDistribution(reviewMetadata));
      setRecommended(getRecommneded(reviewMetadata));
    }
  }, [reviewMetadata]);

  return (
    <div id="rating-breakdown">
      <div id="rating-header">
        <h1 id="rating-header-text">{ !wa ? 0.00 : wa.toFixed(2) }</h1>
        <RatingStars rating={wa} size="1.75rem" color="#f8ce0b" />
      </div>
      <div id="percent-recommend">
        {`${recommended.toFixed(0)}% of reviews recommend this product`}
      </div>
      <br />
      { !ratingDist || ratingDist === null ? null : Object.keys(ratingDist).reverse().map((key) => (
        <RatingBreakdownBar
          key={key}
          rating={key}
          dist={ratingDist[key]}
          count={reviewMetadata.ratings[key]}
          barColors={barColors}
          handleFilter={handleFilter}
        />
      )) }
    </div>
  );
}
