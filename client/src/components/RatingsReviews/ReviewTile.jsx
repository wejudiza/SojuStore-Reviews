import React, { useState } from 'react';

// Subcomponents
import RatingStars from './RatingStars.jsx';
import ReviewTilePhoto from './ReviewTilePhoto.jsx';
import ReviewTileHelpful from './ReviewTileHelpful.jsx';

// Helper Functions
import convertDate from './convertDate.js';

// Renders a single review tile that contains all necessary info + interactions
export default function ReviewTile({ review, helpful }) {
  return (
    <div className="review-tile">
      <div className="review-tile-header">
        { /* Raiting Component */ }
        <RatingStars rating={review.rating} size="15px" color="#f8ce0b" />
        { /* Username + date submitted */ }
        <div className="review-userinfo">
          { `${review.reviewer_name} ${convertDate(review.date)}` }
        </div>
      </div>

      { /* Review Summary + Body + Thumbnails */ }
      <div className="review-section">
        <h3 className="review-summary">{review.summary}</h3>
        <div className="review-body">
          <p className="review-body">{review.body}</p>
          <br />
          { review.photos.map((photo) => (
            <ReviewTilePhoto photo={photo} />
          )) }
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
      <ReviewTileHelpful id={review.id} helpfulness={review.helpfulness} />
      <br />
    </div>
  );
}
