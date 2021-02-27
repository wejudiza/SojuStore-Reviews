import React, { useState, useEffect } from 'react';
import dt from 'moment';

export default function ReviewTile(props) {
  const [review, setReview] = useState(props.review);

  // Function to convert DT format to desired string format
  const convertDate = (date) => {
    const pattern = /\d{4}-\d{2}-\d{2}/;
    const oldDate = date.match(pattern)[0];
    const newDate = dt(oldDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
    return newDate;
  }

  return (
    <div className="review-tile">
      { /* Username + date submitted */ }
      <div className="review-userinfo">
        { `${review.reviewer_name} ${convertDate(review.date)}` }
      </div>
      { /* Review Summary + Body */ }
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
      { /* Recommended conditional render */ }
      <div className="user-recommended">
        { review.recommend ? <div>√  I recommend this product</div> : null }
      </div>
      { /* Response conditional render to review */ }
      <div className="review-response">
        { review.response ? <div>{ review.response }</div> : null }
      </div>
      <br />
    </div>
  );
}
