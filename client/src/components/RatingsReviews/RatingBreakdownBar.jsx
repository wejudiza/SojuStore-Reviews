import React from 'react';

export default function RatingBreakdownBar({ rating, dist }) {
  return (
    <div className="breakdown-bar">
      { `${rating} stars` }
      <div className="bar-background">
        <div className="bar-foreground" style={{width: `${dist}%`}}></div>
      </div>
    </div>
  );
}
