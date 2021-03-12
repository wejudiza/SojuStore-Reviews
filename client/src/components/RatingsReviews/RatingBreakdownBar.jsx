import React, { useState, useEffect } from 'react';

export default function RatingBreakdownBar(props) {
  const { rating, dist, count, barColors, handleFilter } = props;
  const [color, setColor] = useState('#ffffc7');

  useEffect(() => setColor('#ffffc7'), [barColors]);

  return (
    <div className="bar-container" onClick={() => {
      handleFilter(rating);
      setColor(color === 'lightgrey' ? '#ffffc7' : 'lightgrey');
    }}>
      <div className="bar-text">{ `${rating} stars` }</div>
      <div className="bar-background" style={{background: color}}>
        <div className="bar-foreground" style={{width: `${dist}%`}}></div>
      </div>
      <div className="bar-count">{count}</div>
    </div>
  );
}
