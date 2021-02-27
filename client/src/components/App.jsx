import React, { Component } from 'react';
// import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';
import QnA from './QnA.jsx';

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
        <QnA />
      </div>
    );
  }
}