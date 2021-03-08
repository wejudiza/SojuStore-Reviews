import React, { useState } from 'react';

export default function AddReviewText(props) {
  const { name, header, placeholder, min, max, setText, setCount, charCount } = props;

  return (
    <div className="review-text">
      <h4>{header}</h4>
      { charCount >= min ? charCount : `Min: ${min}` } {` / ${max} characters `}
      <br />

      <textarea
        className={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setText(e);
          setCount(e);
        }}
      />
    </div>
  );
}
