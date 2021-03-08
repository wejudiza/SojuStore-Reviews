import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import sortReviews from './sortReviews.js';

export default function ReviewTileHelpful(props) {
  const { id, sort, helpfulness, setAllReviews } = props;
  const productID = useContext(UserContext).id;
  const [voted, setVoted] = useState(false);

  // Click event that sets voted state + sends request to API (eventually)
  const handleClick = (e) => {
    setVoted(true);
    if (e.target.getAttribute('id') === 'yes') {
      axios.put(`/api/reviews/${id}/helpful`, null)
        .then(() => axios.get(`/api/reviews/${productID}`)
          .then((resp) => setAllReviews(sortReviews(resp.data.results, sort))))
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="review-helpful">
      { /* Responses - conditionally render & disappear after vote */ }
      { `Helpful? (${helpfulness}) `}
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
