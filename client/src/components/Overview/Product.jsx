import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';

import StyleSelect from './StyleSelect.jsx';
import RatingStars from '../RatingsReviews/RatingStars.jsx';

// need to link star component from Liam/Jordan
// add a READ ALL REVIEWS LINK -> with Liam

function Product() {
  const msg = useContext(UserContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(msg)
  }, [msg])

  return (
    <div>
      <div id="defaultDescription">
        <div className="category-rating">
        ***** <u>(star rating)</u>
        <br />
        {data.category}
        </div>
        <div className="product-detail">
        <h2>{data.name}</h2>
        <h4> <em>{data.slogan}</em> </h4>
        {data.description}
        </div>
      </div>
        <StyleSelect data={data.id} />

      <div id="social-media">
        <center> Social Media </center>
        <SocialIcon url='https://twitter.com/cheongsophia' />
        <SocialIcon url='https://www.facebook.com/cheongsophia' />
        <SocialIcon url='https://www.pinterest.com/sophiacheong/_saved/' />
      </div>
    </div>
  )
};

export default Product;
