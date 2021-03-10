import React, { useContext } from 'react';
import axios from 'axios';

// Contexts
import { UserContext } from '../UserContext.jsx';

export default function AddReviewSubmit(props) {
  const { texts, counts, options, urls } = props;
  const productID = useContext(UserContext).id;
  const rating = options.rating;
  const recommend = options.recommend === 1;
  const allowed = Object.keys(options).filter((key) => !['recommend', 'rating'].includes(key));

  const filteredOptions = Object.keys(options)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = options[key];
      return obj;
    }, {});

  const body = {
    product_id: productID,
    rating: rating,
    summary: texts.summary,
    body: texts.body,
    recommend,
    name: texts.name,
    email: texts.email,
    photos: urls,
    characteristics: filteredOptions
  }

  return (
    <>
      <br />
      {JSON.stringify(body)}
      <button id="submit-review-btn" type="button" onClick={() => axios.post('/api/reviews', body)}>Submit</button>
    </>
  );
}
