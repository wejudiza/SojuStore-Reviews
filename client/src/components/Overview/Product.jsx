/* eslint-disable no-lone-blocks */
/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-scroll';
import { UserContext } from '../UserContext.jsx';
import { UserClick } from '../UserClick';

import StyleSelect from './StyleSelect.jsx';
import RatingStars from '../RatingsReviews/RatingStars.jsx';
import Feature from './Feature.jsx';
import Default from './Def-Expanded.jsx';
import GalleryImg from './GalleryImg.jsx';
import ProductInfo from './ProductInfo.jsx';

// fix the features tag.. displaying wise it's too crowded
// fix react-scroll, go down to liam's component

function Product(props) {
  const msg = useContext(UserContext);
  const [data, setData] = useState([]);
  const [rating, setRate] = useState();
  const [WA, setWA] = useState();
  const [totalReview, setTotal] = useState();
  const [feature, setFeature] = useState();
  const [style, setStyle] = useState([]);
  const [defaultStyle, setDefault] = useState({});
  const [thumb, setThumbnail] = useState([]);
  const [photo, setPhoto] = useState('');
  const [indexPhoto, setIndex] = useState(0);
  const [reset, setReset] = useState();
  const click = useContext(UserClick);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setData(msg);
  }, [msg]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      axios.all([
        axios.get(`api/reviews/meta/${data.id}`),
        axios.get(`api/product_id/${data.id}`),
        axios.get(`api/styles/${data.id}`),
      ])
        .then(axios.spread((reviews, ft, styles) => {
          setRate(reviews.data);
          setFeature(ft.data.features);
          setStyle(styles.data.results);
          setIndex(0)
        }))
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    }
  }, [data]);

  useEffect(() => {
    const res = [];
    let count = 0;
    // eslint-disable-next-line no-lone-blocks
    if (style.length === 1) {
      style.map((item) => {
        setDefault(item);
        item.photos.map((item, index) => {
          if (index === 0) {
            res.push(item);
            setThumbnail(res);
          }
        })
      })
    } else {
      { style.map((item) => {
        if (item['default?']) {
          count--;
          setDefault(item);
        }
        count++;
        item.photos.map((item, index) => {
          if (index === 0) {
            res.push(item);
            setThumbnail(res);
          }
        });
      }); }
    }

    if (count === style.length && count !== 0) {
      setDefault(style[0])
    }
  }, [style]);

  useEffect(() => {
    if (Object.keys(defaultStyle).length > 0) {
      setPhoto(defaultStyle.photos[0].url);
    }
  }, [defaultStyle]);

  useEffect(() => {
    let total = 0;
    if (rating !== undefined) {
      setWA(getWA(rating));

      for (const review in rating.ratings) {
        total += Number(rating.ratings[review]);
      }
    }
    setTotal(total);
  }, [rating]);

  // helper function to get the WA
  // eslint-disable-next-line consistent-return
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
      <div id="productContainer" onClick={(e) => click(e, props.widget)}>
        <div className="secondProd" onClick={(e) => click(e, props.widget)}>
          <div className="mainPhoto">
            <Default
              default={photo}
              setDefault={setPhoto}
              style={defaultStyle}
              index={indexPhoto}
              setIndex={setIndex}
              allStyle={thumb}
            />
          </div>
          <GalleryImg
            default={defaultStyle}
            setDefaultPhoto={setPhoto}
            setIndex={setIndex}
            index={indexPhoto}
          />
        </div>
        <div id="overView" onClick={(e) => click(e, props.widget)}>
          <div id="defaultDescription" onClick={(e) => click(e, props.widget)}>
            <div className="category-rating" onClick={(e) => click(e, props.widget)}>
              <RatingStars rating={WA} size="15px" color="#F5DEB3" />
              <Link to="ratings-reviews" smooth spy duration={500} isDynamic>
                &nbsp;
                <u style={{ cursor: 'pointer' }} >
                  Read all
                  [
                  {totalReview}
                  ]
                  reviews
                </u>
              </Link>
              <br />
              {data.category}
            </div>
            <div className="product-detail">
              <h2>{data.name}</h2>
              <h4>
                {' '}
                <em>{data.slogan}</em>
                {' '}
              </h4>
              <p style={{ fontSize: '19px' }}>{data.description}</p>
            </div>
          </div>
          <StyleSelect
            defaultStyle={defaultStyle}
            setPhoto={setPhoto}
            setDefault={setDefault}
            style={style}
            thumbnail={thumb}
            setIndex={setIndex}
            setReset={setReset}
          />
          <ProductInfo reset={reset} default={defaultStyle} />
          <div id="social-media-Container">
            <div className="socialItems">
              <SocialIcon url="https://twitter.com/cheongsophia" />
              <SocialIcon url="https://www.facebook.com/cheongsophia" />
              <SocialIcon url="https://www.pinterest.com/sophiacheong/_saved/" />
            </div>
            <Feature ft={feature} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
