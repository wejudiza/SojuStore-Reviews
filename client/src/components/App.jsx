import React, { Component } from 'react';
// import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';
import QnA from './QnA.jsx';

// Import RatingsReviews Components
import SortSelect from './RatingsReviews/SortSelect.jsx';
import ReviewTile from './RatingsReviews/ReviewTile.jsx';


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
      <div id="ratings-reviews">
        <h3>Ratings & Reviews</h3>
        <SortSelect />
        <ReviewTile />
      </div>

      </div>

    );
  }
}