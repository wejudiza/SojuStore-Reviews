import React, { Component } from 'react';
// import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';

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
        <RelatedProducts />
      </div>
    );
  }
}