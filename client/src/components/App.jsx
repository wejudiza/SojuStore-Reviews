import React, { Component } from 'react';
// import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/Reviews.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Testing webpack link
        <ProductInfo />
        <RelatedItems />

      {/* --- Ratings & Reviews --- */}
      <RatingsReviews />

      </div>

    );
  }
}