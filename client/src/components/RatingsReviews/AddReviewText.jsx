import React, { useState } from 'react';

export default function AddReviewText(props) {
  const { name, placeholder, min, max, charCount, handleTextChange } = props;
  // const [charCount, setCharCount] = useState(0);
  // const countChars = (e) => setCharCount(e.target.value.length);

  return (
    <div className="review-text">
      <h4>{name}</h4>
      { charCount >= min ? charCount : `Min: ${min}` } {` / ${max} characters `}
      <br />

      <textarea
        className={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleTextChange}
      />
    </div>
  );
}
