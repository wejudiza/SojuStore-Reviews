import React, { useState } from 'react';

export default function AddReviewText(props) {
  const [charCount, setCharCount] = useState(0);
  const countChars = (e) => setCharCount(e.target.value.length);
  const placeholder = 'test';

  return (
    <div>
      <textarea
        type="text"
        placeholder={placeholder}
        onChange={countChars}
      />
    </div>
  );
}
