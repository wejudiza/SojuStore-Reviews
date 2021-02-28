import React, { useState, useEffect } from 'react';
import dt from 'moment';

// Import components
import ReviewTileHelpful from './ReviewTileHelpful.jsx';

// Renders a single review tile that contains all necessary info + interactions
export default function ReviewTile(props) {
  const [review, setReview] = useState(props.review);
  const [helpfullness, setHelpfullness] = useState(props.review.helpfullness);

  // Function to convert DT format to desired string format
  const convertDate = (date) => {
    const pattern = /\d{4}-\d{2}-\d{2}/;
    const oldDate = date.match(pattern)[0];
    const newDate = dt(oldDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
    return newDate;
  };

  return (
    <div className="review-tile">
      { /* Username + date submitted */ }
      <div className="review-userinfo">
        { `${review.reviewer_name} ${convertDate(review.date)}` }
      </div>
      { /* Review Summary + Body + Thumbnails */ }
      <div className="review-section">
        <h3 className="review-summary">{review.summary}</h3>
        <div className="review-body">
          <p className="review-body-text">{review.body}</p>
          <br />
          <div className="review-body-photos">
            {
            review.photos.map((photo) => (
              <img
                src={photo.url}
                alt={photo.id}
                key={photo.id}
                width="75"
                heigh="75"
              />
            ))
            }
          </div>
        </div>
      </div>
      <br />
      { /* Recommended conditional render */ }
      <div className="user-recommended">
        { review.recommend ? <div>√  I recommend this product<br /></div> : null }
      </div>
      { /* Response conditional render to review */ }
      <div className="review-response">
        { review.response ? <div><h4>Response</h4>{review.response}</div> : null }
      </div>
      <br />
      { /* Helpful Subcomponent (ability to click yes/no + see count for vote) */ }
      <ReviewTileHelpful helpfullness={review.helpfulness} />
    </div>
  );
}
