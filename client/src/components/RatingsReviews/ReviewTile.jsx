import React, { useState, useEffect } from 'react';

export default function ReviewTile(props) {
  const [review, setReview] = useState(props.review);

  return (
    <div>
      <h3>{review.summary}</h3>
    </div>
  );
}
