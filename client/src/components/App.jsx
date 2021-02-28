import React, { Component } from 'react';
// import axios from 'axios';
import ProductInfo from './Overview/ProductInfo.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import Product from './Overview/Product.jsx';

//Import from QnA
import QnA from './QnA/QnA.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Testing webpack link
        {/* <Product /> */}
        {/* <RelatedProducts /> */}

      {/* --- Ratings & Reviews --- */}
      <div id="ratings-reviews">
        <h3>Ratings & Reviews</h3>
        <SortSelect />
        <ReviewTile />
        <div id="questions">
          <h3>Questions</h3>
        <QnA />
        </div>
      </div>

      </div>

    );
  }
}