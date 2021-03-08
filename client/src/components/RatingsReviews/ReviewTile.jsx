import React from 'react';
import dt from 'moment';

// Subcomponents
import RatingStars from './RatingStars.jsx';
import ReviewTilePhoto from './ReviewTilePhoto.jsx';
import ReviewTileHelpful from './ReviewTileHelpful.jsx';

// Helper Functions
const convertDate = (date) => {
  const pattern = /\d{4}-\d{2}-\d{2}/;
  const oldDate = date.match(pattern)[0];
  const newDate = dt(oldDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
  return newDate;
};

// Renders a single review tile that contains all necessary info + interactions
export default function ReviewTile(props) {
  const { review, sort, setAllReviews } = props;
  return (
    <div className="review-tile">
      { /* Star Raiting, username, date */ }
      <div className="review-summary">{review.summary}</div>
      <div className="review-tile-header">
        <div className="review-user-rating">
          <RatingStars rating={review.rating} size="1rem" color="#f8ce0b" />
          <div>{review.reviewer_name}</div>
        </div>
        <div className="review-date">{convertDate(review.date)}</div>
      </div>

      { /* Review Summary + Body + Thumbnails */ }
      <div className="review-tile-body">
        <div className="user-recommended">
          { review.recommend ? <div>√  I recommend this product<br /></div> : null }
        </div>
        <p>{review.body}</p>
      </div>
      { /* Response conditional render to review */ }
      <div className="review-response">
        { review.response ? <div><h4>Response</h4>{review.response}</div> : null }
      </div>

      { /* Helpful Subcomponent (ability to click yes/no + see count for vote) */ }
      <div className="review-tile-footer">
        <ReviewTileHelpful
          id={review.review_id}
          sort={sort}
          helpfulness={review.helpfulness}
          setAllReviews={setAllReviews}
        />
      </div>
      <div className="review-tile-footer-photos">
        { review.photos.map((photo, key) => (
          <ReviewTilePhoto photo={photo} key={key} />
        )) }
      </div>
    </div>
  );
}
