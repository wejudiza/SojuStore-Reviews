import React from 'react';

export default function RatingBreakdownBar(props) {
  const { rating, dist, count, handleFilter } = props;

  return (
    <div className="bar-container" onClick={() => handleFilter(rating)}>
      <div className="bar-text">{ `${rating} stars` }</div>
      <div className="bar-background">
        <div className="bar-foreground" style={{width: `${dist}%`}}></div>
      </div>
      <div className="bar-count">{count}</div>
    </div>
  );
}
