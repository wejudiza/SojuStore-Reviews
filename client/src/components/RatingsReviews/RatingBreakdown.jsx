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

const getDistribution = (metadata) => {
  const dist = {};
  const { ratings } = metadata;
  const total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
  Object.keys(ratings).map((key) => dist[key] = Number(ratings[key]) / total * 100);
  return dist;
};

const getRecommneded = (metadata) => {
  const { recommended } = metadata;
  const yes = Number(recommended.true);
  const no = Number(recommended.false);
  return yes / (yes + no) * 100;
};

export default function RatingBreakdown(props) {
  const { reviewMetadata, handleFilter } = props;
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
    <div id="rating-reakdown">
      <div id="rating-header">
        <h1>{ wa.toFixed(1) }</h1>
        <RatingStars rating={wa} size="25px" color="#f8ce0b" />
      </div>
      <div id="percent-recommend">
        {`${recommended.toFixed(0)}% of reviews recommend this product` }
      </div>
      { Object.keys(ratingDist).reverse().map((key) => (
        <RatingBreakdownBar key={key} rating={key} dist={ratingDist[key]} handleFilter={handleFilter} />
      )) }
    </div>
  );
}
