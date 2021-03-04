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

// App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  // results.data[0] - replace 16059
  // need to test - OutOfStock -> change data

  componentDidMount() {
    axios.get('/api')
      .then((results) => {
        this.setState({
          data: results.data[9]
        })
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state.data}>
          <Product />
          {/* <RelatedProductsList /> */}

          {/* --- Ratings & Reviews --- */}
          <div id="ratings-reviews">
            {/* <RatingsReviews /> */}
          </div>

          {/* <div id="questions">
            <h3>Questions</h3>
            <QnA />
          </div> */}
        </UserContext.Provider>
      </div>

    );
  }
}
