import React, { Component } from 'react';
// import axios from 'axios';
<<<<<<< HEAD
import RelatedItems from './RelatedItems.jsx';
import Product from './Overview/Product.jsx';
=======
import RelatedProducts from './RelatedProducts.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';
>>>>>>> 36f6242d5cde0b678dab6398f588e9870d7e3418

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
<<<<<<< HEAD
        <Product />
        <RelatedItems />
=======
        <ProductInfo />
        <RelatedProducts />
>>>>>>> 36f6242d5cde0b678dab6398f588e9870d7e3418

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