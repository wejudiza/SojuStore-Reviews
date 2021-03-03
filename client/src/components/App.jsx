import React, { Component } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import axios from 'axios';
import ProductInfo from './Overview/ProductInfo.jsx';
import Product from './Overview/Product.jsx';
import { UserContext } from './UserContext.jsx';

//Import from QnA
import QnA from './QnA/QnA.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import SortSelect from './RatingsReviews/SortSelect.jsx';
import ReviewTile from './RatingsReviews/ReviewTile.jsx'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('/api')
      .then((results) => {
        this.setState({
          data: results.data[0]
        })
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state.data}>
          <Product />
          <RelatedProductsList />

          {/* --- Ratings & Reviews --- */}
          <div id="ratings-reviews">
            <h3>Ratings & Reviews</h3>
            {/* <SortSelect /> */}
            {/* <ReviewTile /> */}
            <div id="questions">
              <h3>Questions</h3>
            {/* <QnA /> */}
            </div>
          </div>
      </UserContext.Provider>
      </div>

    );
  }
}