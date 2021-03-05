import React, { useState } from 'react';
import axios from 'axios';

export default function ReviewTileHelpful(props) {
  const [voted, setVoted] = useState(false);

  // Click event that sets voted state + sends request to API (eventually)
  const handleClick = (e) => {
    setVoted(true);
    if (e.target.getAttribute('id') === 'yes') {
      // axios.put(`/api/reviews/${props.id}/helpful`)
      //   .then((resp) => console.log(resp))
      //   .catch((err) => alert(err))
      console.log('YES VOTE');
    } else {
      console.log('NO VOTE');
    }
  };

  return (
    <div className="review-helpful">
      { `Helpful? (${props.helpfulness}) `}
      { /* Responses - conditionally render & disappear after vote */ }
      { voted ? null : (
        <div id="helpful-responses">
          <div id="yes" onClick={handleClick}>Yes</div>
          |
          <div id="no" onClick={handleClick}>No</div>
        </div>
      ) }
    </div>
  );
}
