import React, { useContext } from 'react';
import axios from 'axios';

// Contexts
import { UserContext } from '../UserContext.jsx';

export default function AddReviewSubmit(props) {
  const { texts, counts, options, urls } = props;
  const productID = useContext(UserContext).id;
  const recommend = options.recommend === 1;
  delete options.recommend;

  const body = {
    product_id: productID,
    rating: 5,
    summary: texts.summary,
    body: texts.body,
    recommend,
    name: texts.name,
    email: texts.email,
    photos: urls,
    characteristics: options
  }

  return (
    <>
      <br />
      <button id="submit-review-btn" type="button" onClick={() => axios.post('/api/reviews', body)}>Submit</button>
    </>
  );
}
