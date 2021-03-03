import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import axios from 'axios';

import StyleSelect from './StyleSelect.jsx';

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
        <em> Social Media &#10140;</em>
        <img className="social" src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"></img>
        <img className="social" src="https://cdn4.iconfinder.com/data/icons/bettericons/354/facebook-circle-512.png"></img>
        <img className="social" src="https://cdn.icon-icons.com/icons2/2119/PNG/512/social_pinterest_icon_131227.png"></img>
      </div>
    </div>
  )
};

export default Product;
