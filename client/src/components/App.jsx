import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';
import Product from './Overview/Product.jsx';

//Import from QnA
import QnA from './QnA/QnA.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

// App component
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
        <RelatedProductsList /> */}

        {/* --- Ratings & Reviews --- */}
        <div id="ratings-reviews">
          <RatingsReviews />
        </div>

        {/* <QnA /> */}
        {/* <div id="questions">
          <h3>Questions</h3>
        </div> */}

      </div>

    );
  }
}
