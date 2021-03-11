import React, { useContext } from 'react';
import axios from 'axios';

// Contexts
import { UserContext } from '../UserContext.jsx';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      <button id="submit-review-btn" type="button" onClick={() => {
        checkReqs(texts, counts, rating);
        axios.post('/api/reviews', body);
      }}>Submit</button>
    </>
  );
}

// I know i could probably do this programatically but i just dont have the brainpower or patience
const checkReqs = (texts, counts, rating) => {
  if (rating === 0 || rating === '0') {
    alert('You must provide a Rating');
  }
  Object.keys(texts).map((section) => {
    if (section === 'summary') {
      if (counts[section] === 0) {
        alert('You must provide a Review Summary');
      } else if (counts[section] > 60) {
        alert('Your Review Summary must be less than 60 characters');
      }
    } else if (section === 'body') {
      if (counts[section] === 0) {
        alert('You must provide a Full Review');
      } else if (counts[section] > 1000) {
        alert('Your Full Review must be less than 1000 characters');
      } else if (counts[section] < 50) {
        alert('Your Full Review must be more than 50 characters');
      }
    } else if (section === 'name') {
      if (counts[section] === 0) {
        alert('You must provide an Username');
      } else if (counts[section] > 60) {
        alert('Your Username must be less than 60 characters');
      }
    } else if (section === 'email') {
      if (counts[section] === 0) {
        alert('You must provide an Email');
      } else if (counts[section] > 60) {
        alert('Your Email must be less than 60 characters');
      } else if (!texts[section].match(emailRegex)) {
        alert('You must provide a valid Email');
      }
    }
  });
};
