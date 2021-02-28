import React, { Component } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Product from './Overview/Product.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

import QnA from './QnA/QnA.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* Testing webpack link
        <Product />
        <RelatedProducts /> */}

      {/* --- Ratings & Reviews --- */}
      {/* <RatingsReviews /> */}
      <QnA />
      </div>

    );
  }
}