import React from 'react';

export default function RatingBreakdownBar(props) {
  const { rating, dist, handleFilter } = props;

  return (
    <div className={rating} onClick={() => handleFilter(rating)}>
      { `${rating} stars` }
      <div className="bar-background">
        <div className="bar-foreground" style={{width: `${dist}%`}}></div>
      </div>
    </div>
  );
}
