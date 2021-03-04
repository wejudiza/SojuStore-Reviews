import React from 'react';

/* -------------
Helper Functions
------------- */
// Converts a characteristic rating to relative % position (0, 100)
const getTrianglePosition = (rating) => (((rating - 1) * 25));

// Gets label names + positions based on characteristic
const getLabels = (characteristic) => {
  const labels = {
    Fit: ['Runs tight', 'Perfect', 'Runs long'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Comfort: ['Unfortable', null, 'Perfect'],
    Quality: ['Poor', null, 'Perfect']
  };

  return labels[characteristic];
}

/* --------------------------
ProductBreakdownBar Component
-------------------------- */
// Dyanmic breakdown bar subcomponent that given a characteristic & value
export default function ProductBreakdownBar({ characteristic, value }) {
  const markerPosition = `${getTrianglePosition(value)}%`;
  const labels = getLabels(characteristic);

  return (
    <div className="product-breakdown">
      <br />
      score: { markerPosition }
      { /* Breakdown bar + traingle */ }
      <div className="product-bar-container">
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        <div className="triangle" style={{ left: markerPosition }} />
      </div>

      { /* Breakdown bar lalels */ }
      <div className="product-bar-labels">
        <div className="product-bar-label0" style={{ textAlign: 'left' }}>{ labels[0] }</div>
        <div className="product-bar-label1" style={{ textAlign: 'center', textJustify: 'center' }}>{ labels[1] }</div>
        <div className="product-bar-label2" style={{ textAlign: 'right' }}>{ labels[2] }</div>
      </div>
      <br />
    </div>
  );
}
