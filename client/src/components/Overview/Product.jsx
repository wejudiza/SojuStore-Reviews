import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { Scroll, Link } from 'react-scroll';

import StyleSelect from './StyleSelect.jsx';
import RatingStars from '../RatingsReviews/RatingStars.jsx';
import Feature from './Feature.jsx';

function Product() {
  const msg = useContext(UserContext)
  const [data, setData] = useState([]);
  const [rating, setRate] = useState();
  const [WA, setWA] = useState()
  const [totalReview, setTotal] = useState();
  const [feature, setFeature] = useState();

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    setData(msg)
  }, [msg])

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      axios.get(`/api/reviews/meta/${data.id}`)
        .then((results) => setRate(results.data))
        .catch((err) => console.error(err));
    }
  }, [data])

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      axios.get(`api/product_id/${data.id}`)
        .then((results) => setFeature(results.data.features))
        .catch((err) => console.error(err))
    }
  }, [data])

  useEffect(() => {
    var total = 0
    if (rating !== undefined) {
      setWA(getWA(rating))
      for (let review in rating.ratings) {
        total += Number(rating.ratings[review])
      }
    }
    setTotal(total)
  }, [rating])

  // helper function to get the WA
  const getWA = (metadata) => {
    const { ratings } = metadata;
    const waArray = Object.keys(ratings).map((key) => Number(key) * Number(ratings[key]));
    if (Object.values(ratings).length > 1) {
      let total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
      total = total === 0 ? 1 : total;
      let wa = waArray.reduce((sum, val) => sum + val) / total;
      wa = wa ?? 0;
      return wa;
    }
  };

  return (
    <div>
      <div id="defaultDescription">
        <div className="category-rating">
        <RatingStars rating={WA} size={'15px'} color={'#F5DEB3'} />
        <Link to="ratings-reviews" smooth={true} spy={true} duration={500} isDynamic={true}>
        &nbsp;<u style={{cursor: 'pointer'}}>Read all[{totalReview}] reviews</u>
        </Link>
        <br />
        {data.category}
        </div>
        <div className="product-detail">
        <h2>{data.name}</h2>
        <h4> <em>{data.slogan}</em> </h4>
        <p style={{fontSize: '16.5px'}}>{data.description}</p>
        </div>
      </div>
        <StyleSelect data={data.id} />

      <div id="social-media">
        <center> Social Media </center>
        <SocialIcon url='https://twitter.com/cheongsophia' />
        <SocialIcon url='https://www.facebook.com/cheongsophia' />
        <SocialIcon url='https://www.pinterest.com/sophiacheong/_saved/' />
      </div>
      <Feature ft={feature}/>
    </div>
  )
};

export default Product;
