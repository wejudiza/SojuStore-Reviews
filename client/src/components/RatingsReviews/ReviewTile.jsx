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
      <div className="review-tile-header">
        <RatingStars rating={review.rating} size="15px" color="#f8ce0b" />
        <div className="review-userinfo">
          { `${review.reviewer_name} ${convertDate(review.date)}` }
        </div>
      </div>

      { /* Review Summary + Body + Thumbnails */ }
      <div className="review-section">
        <h3 className="review-summary">{review.summary}</h3>
        <div className="review-body">
          <p>{review.body}</p>
          <br />
          { review.photos.map((photo, key) => (
            <ReviewTilePhoto photo={photo} key={key} />
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
      <ReviewTileHelpful
        id={review.review_id}
        sort={sort}
        helpfulness={review.helpfulness}
        setAllReviews={setAllReviews}
      />
      <br />
    </div>
  );
}
