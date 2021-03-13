/* ------------------------------------
Import depdencies, contexts, components
------------------------------------ */
import React, { Component, Suspense } from 'react';
import axios from 'axios';
import dt from 'moment';
import { UserClick } from './UserClick.js';
import { UserContext } from './UserContext.jsx';

// Components
const Product = React.lazy(() => import('./Overview/Product.jsx'));
const ProductInfo = React.lazy(() => import('./Overview/ProductInfo.jsx'));
const RelatedProductsList = React.lazy(() => import('./RelatedProducts/RelatedProductsList.jsx'));
const OufitList = React.lazy(() => import('./RelatedProducts/OutfitList.jsx'));
const QnA = React.lazy(() => import('./QnA/QnA.jsx'));
const RatingsReviews = React.lazy(() => import('./RatingsReviews/RatingsReviews.jsx'));

/* ----------
App Component
---------- */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      darkMode: false,
      sendClickInfo: (e, widget) => {
        const element = e.target.id.length === 0 ? e.target.className : e.target.id;
        const body = {
          element,
          widget,
          time: dt().format()
        };
        axios.post('/api/interactions', body)
          .then(() => console.log(`Posted interaction for ${element} in widget ${widget}`))
          .catch((err) => console.log(err));
      }
    };
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.signInClick = this.signInClick.bind(this);
    this.signOutClick = this.signOutClick.bind(this);
    this.toggleDark = this.toggleDark.bind(this);
  }

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
          <button className="dark" onClick={this.toggleDark}>Toggle dark Mode</button>
          <div className="headerContainer">
          <div className="textContainer">
            <div id="headerImg"></div>
            <div className="store-name">SOJU STORE</div>
            <p className="slogan">HUNDREDS OF NEW ARRIVALS</p>
            <p className="shipping">Free Shipping and Returns*</p>
          </div>
          </div>
          <div className="container2">
            <div className="search-container">
              <input type="text" defaultValue="" placeholder="Enter your search here..." id="main-search" />
              <i className="fas fa-search search-btn" />
            </div>
            <div className="signin-out">
              <button onClick={this.signInClick} className="signin">Sign In</button>
              <button onClick={this.signOutClick} className="signout">Sign Out</button>
            </div>
          </div>
        </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserContext.Provider value={this.state.data}>
          <UserClick.Provider value={this.state.sendClickInfo}>
            <Product widget="ProductOverview" />
            <div className="all-related-container">
            <h3 className="related-header">Related Products</h3>
            <RelatedProductsList mainProduct={this.state.data} updateCurrentProduct={this.updateCurrentProduct} click={this.state.sendClickInfo} widget="RelatedProducts"/>
            <h3 className="outfit-header">Your Outfit</h3>
            <OufitList mainProduct={this.state.data} click={this.state.sendClickInfo} widget="OutfitList"/>
            </div>

            {/* --- QnA ---*/}
            <div id="qna">
              <div id="header-border">
              <h3 id="questions-logo">Questions & Answers</h3>
              </div>
              <div id="questions-and-answers">
                <QnA widget="QuestionsAndAnswers" />
              </div>
            </div>

            {/* --- Ratings & Reviews --- */}
            <div id="ratings-reviews-container">
              <RatingsReviews widget="RatingsReviews" />
            </div>
          </UserClick.Provider>
        </UserContext.Provider>
      </Suspense>
      </div>
    );
  }
}
