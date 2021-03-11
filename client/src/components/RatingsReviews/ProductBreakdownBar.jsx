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
    Size: ['Too small', 'Perfect', 'Too big'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Comfort: ['Unfortable', null, 'Perfect'],
    Quality: ['Poor', null, 'Perfect']
  };

  return labels[characteristic];
};

const colorStyles = {
  scale: ['#f5005a', '#ffc400', '#fff700', '#aaff00', '#50ebb2'],
  divergent: ['#f5005a', '#fff700', '#50ebb2', '#fff700', '#f5005a']
};

/* --------------------------
ProductBreakdownBar Component
-------------------------- */
// Dyanmic breakdown bar subcomponent that given a characteristic & value
export default function ProductBreakdownBar({ characteristic, value, isOpen }) {
  const markerPosition = getTrianglePosition(value);
  const labels = getLabels(characteristic);
  const markerColor = ['Comfort', 'Quality'].includes(characteristic) ? colorStyles.scale[Math.floor(markerPosition * .05)] : colorStyles.divergent[Math.floor(markerPosition * .05)];

  return (
    <div className="product-breakdown">
      { /* Breakdown bar + traingle */ }
      <div className="product-bar-title">{characteristic}</div>
      <div className="product-bar-container">
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        { isOpen ? null : <div className="triangle" style={{ left: `${markerPosition}%`, color: markerColor }} /> }
        { isOpen ? null : <div className="triangle-behind" style={{ left: `${markerPosition}%` }} /> }
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
