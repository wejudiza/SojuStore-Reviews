import React, { useState } from 'react';

export default function AddReviewText(props) {
  const { name, header, placeholder, min, max, setText, setCount, charCount, privacy } = props;

  return (
    <div className="review-text">
      <div className="review-text-header">
        <h4 className="review-text-title">{header}</h4>
        <div className="review-text-count">
          { charCount >= min ? `(${charCount}` : `(Min: ${min}` } {` / ${max} characters)`}
        </div>
      </div>
      <div className="add-review-privacy">{!privacy ? null : privacy}</div>

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
