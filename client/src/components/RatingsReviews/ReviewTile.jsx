import React, { useState, useEffect } from 'react';
import Thumbnails from './Thumbnails.jsx';

export default function ReviewTile(props) {
  const [review, setReview] = useState(props.review);

  return (
    <div className="review-tile">
      { /* Username + date submitted */ }
      <div className="review-userinfo">

      </div>
      { /* Review Summary + Body */ }
      <div className="review-section">
        <h3 className="review-summary">{review.summary}</h3>
        <p className="review-body">
          {review.body}
          <br></br>
          <div className="review-thumbnails">
            { review.photos.map((photo) => <img src={photo.url} alt={photo.id} key={photo.id} />)}
          </div>
        </p>
      </div>
      { /* Recommended conditional render */ }
      <div className="user-recommended">
        { review.recommend ? <div>√  I recommend this product</div> : null }
      </div>
      { /* Response conditional render to review */ }
      <div className="review-response">
        { review.response ? <div>{ review.response }</div> : null }
      </div>
    </div>
  );
}
