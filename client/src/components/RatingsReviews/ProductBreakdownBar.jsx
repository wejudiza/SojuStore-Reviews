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
}

const colorGradient = [
  'F0FF00',
  'E0FF00',
  'D0FF00',
  'C0FF00',
  'B0FF00',
  'A0FF00',
  '90FF00',
  '80FF00',
  '70FF00',
  '60FF00',
  '50FF00',
  '40FF00',
  '30FF00',
  '20FF00',
  '10FF00'
];

// func(perc) -> convert to an index from 0-15
// 0 === 0%
// 15 === 100%


/* --------------------------
ProductBreakdownBar Component
-------------------------- */
// Dyanmic breakdown bar subcomponent that given a characteristic & value
export default function ProductBreakdownBar({ characteristic, value }) {
  const markerPosition = getTrianglePosition(value);
  const labels = getLabels(characteristic);
  const markerColor = `#${colorGradient[Math.floor(markerPosition * .15)]}`;

  return (
    <div className="product-breakdown">
      { /* Breakdown bar + traingle */ }
      <div className="product-bar-title">{characteristic}</div>
      <div className="product-bar-container">
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        <div className="product-bar-background" />
        <div className="triangle" style={{ left: `${markerPosition}%`, color: markerColor }} />
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
