import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import Product from './Overview/Product.jsx';

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
        <Product />
        <RelatedProductsList />

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