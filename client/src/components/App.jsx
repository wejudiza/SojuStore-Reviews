import React, { Component } from 'react';
// import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';

// Import RatingsReviews Components
import SortingSelect from './RatingsReviews/SortingSelect.jsx';


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
        <SortingSelect />
      </div>
    );
  }
}