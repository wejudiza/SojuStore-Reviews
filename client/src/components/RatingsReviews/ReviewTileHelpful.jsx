import React, { useState } from 'react';

export default function ReviewTileHelpful(props) {
  const [voted, setVoted] = useState(false);

  // Click event that sets voted state + sends request to API (eventually)
  const handleClick = (e) => {
    if (e.target.getAttribute('id') === 'yes') {
      console.log('YES VOTE');
    } else {
      console.log('NO VOTE');
    }

    setVoted(true);
  };

  return (
    <div className="review-helpful">
      { /* Helpful score always renders */}
      { `Helpful? (${props.helpfullness}) `}
      { /* Responses - conditionally render & disappear after vote */ }
      {
      !voted ? (
        <div id="helpful-responses">
          <div id="yes" onClick={handleClick}>Yes</div>
          |
          <div id="no" onClick={handleClick}>No</div>
        </div>
      )
        : null
      }
    </div>
  );
}
