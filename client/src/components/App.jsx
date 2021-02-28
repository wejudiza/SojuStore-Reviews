import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import Product from './Overview/Product.jsx';

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
        <Product />
        <RelatedProductsList />

      {/* --- Ratings & Reviews --- */}
      <RatingsReviews />

      </div>

    );
  }
}