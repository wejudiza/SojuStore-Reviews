/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
import React, { Component, Suspense } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext.jsx';

const Product = React.lazy(() => import('./Overview/Product.jsx'));

// Import from Related Products
const RelatedProductsList = React.lazy(() => import('./RelatedProducts/RelatedProductsList.jsx'));
const OufitList = React.lazy(() => import('./RelatedProducts/OutfitList.jsx'));

// Import from QnA
const QnA = React.lazy(() => import('./QnA/QnA.jsx'));

// Import RatingsReviews Components
const RatingsReviews = React.lazy(() => import('./RatingsReviews/RatingsReviews.jsx'));

// App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      darkMode: false,
    };
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.signInClick = this.signInClick.bind(this);
    this.signOutClick = this.signOutClick.bind(this);
    this.toggleDark = this.toggleDark.bind(this);
  }

  // results.data[0] - replace 16059
  // change back to 9
  // need to test - OutOfStock -> change data

  componentDidMount() {
    axios.get('/api')
      .then((results) => {
        this.setState({
          data: results.data[9],
        });
      })
      .catch((err) => console.error(err));
  }

  // on click change state of data based on provided product
  updateCurrentProduct(product) {
    this.setState({
      data: product,
    });
  }

  signInClick() {
    if (localStorage.userName === undefined) {
      const enteredName = prompt('Welcome to Soju Store! Please enter your name to get started.');
      localStorage.setItem('userName', enteredName);
    } else {
      alert('Already Signed In!');
    }
  }

  signOutClick() {
    if (localStorage.userName === undefined) {
      alert('Not Signed In!')
    } else {
      localStorage.clear();
      window.location.reload(false);
    }
  }

  toggleDark() {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  }

  render() {
    return (
      <div id={this.state.darkMode
        ? 'all-dark' : 'all'}
      >
        <div className="header">
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <img src="2276858.png" />
          </div>
          <div style={{display: 'flex'}}>
          <div className="store-name">SOJU STORE</div>
          <button className="dark" onClick={this.toggleDark}>Toggle dark Mode</button>
          <p className="slogan">HUNDREDS OF NEW ARRIVALS</p>
          <p className="shipping">Free Shipping and Returns*</p>
          </div>
          <div className="search-container">
            <input type="text" defaultValue="" placeholder="Enter your search here..." id="main-search" />
            <i className="fas fa-search search-btn" />
          </div>
          <div className="signin-out">
            <button onClick={this.signInClick} className="signin">Sign In</button>
            <button onClick={this.signOutClick} className="signout">Sign Out</button>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UserContext.Provider value={this.state.data}>
            <Product />
            <div style={{background: 'linear-gradient(white, #f8fcff, #f0f8ff)'}} className="all-related-container">
              <h3 className="related-header">Related Products</h3>
              <RelatedProductsList mainProduct={this.state.data} updateCurrentProduct={this.updateCurrentProduct} />
              <h3 className="outfit-header">Your Outfit</h3>
              <OufitList mainProduct={this.state.data} />
            </div>

            {/* --- QnA ---*/}
            <div id="qna">
              <div id="header-border">
              <h3 id="questions-logo">Questions & Answers</h3>
              </div>
              <div id="questions-and-answers">
                <QnA />
              </div>
            </div>

            {/* --- Ratings & Reviews --- */}
            <div id="ratings-reviews-container">
              <RatingsReviews />
            </div>
          </UserContext.Provider>
        </Suspense>
      </div>
    );
  }
}
