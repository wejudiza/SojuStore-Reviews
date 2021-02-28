import React, { useState } from 'react';

export default function ReviewTileHelpful(props) {
  const [voted, setVoted] = useState(false);

  return (
    <div className="review-helpful">
      { !voted ? `Helpful? (${props.helpfullness})  Yes | No` : null }
    </div>
  );
}