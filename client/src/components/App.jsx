import React, { Component } from 'react';
import axios from 'axios';
import ProductInfo from './Overview/ProductInfo.jsx';
import Product from './Overview/Product.jsx';
import { UserContext } from './UserContext.jsx';

//Import from Related Products
import RelatedProductsList from './RelatedProducts/RelatedProductsList.jsx';
import OufitList from './RelatedProducts/OutfitList.jsx';

//Import from QnA
import QnA from './QnA/QnA.jsx';

// Import RatingsReviews Components
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

// App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      darkMode: false
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
          data: results.data[9]
        })
      })
      .catch((err) => console.error(err))
  }


  // on click change state of data based on provided product
  updateCurrentProduct(product) {
    this.setState({
      data: product
    })
  }

  signInClick() {
    if (localStorage.userName === undefined) {
      const enteredName = prompt('Welcome to Soju Store! Please enter your name to get started.')
      localStorage.setItem('userName', enteredName)
    } else {
      alert('Already Signed In!')
    }
  }

  signOutClick() {
    localStorage.clear();
    window.location.reload(false);
  }

  toggleDark() {
    console.log('clicked')
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  render() {
    return (
      <div id={this.state.darkMode ?
        "all-dark" : "all"
      }>
        <div className="header">
          <div className="store-name">SOJU STORE</div>
          <button className="dark" onClick={this.toggleDark}>Toggle dark Mode</button>
          <p className="slogan">HUNDREDS OF NEW ARRIVALS</p>
          <p className="shipping">Free Shipping and Returns*</p>
          <div className="search-container">
            <input type="text" value="" placeholder="Enter your search here..." id="main-search"></input>
            <i className="fas fa-search search-btn"></i>
          </div>
          <div className="signin-out">
            <button onClick={this.signInClick} className="signin">Sign In</button>
            <button onClick={this.signOutClick} className="signout">Sign Out</button>
          </div>
        </div>
        <UserContext.Provider value={this.state.data}>
          <Product />
          <div className="all-related-container">
          <h3 className="related-header">Related Products</h3>
          <RelatedProductsList mainProduct={this.state.data} updateCurrentProduct={this.updateCurrentProduct}/>
          <h3 className="outfit-header">Your Outfit</h3>
          <OufitList mainProduct={this.state.data}/>
          </div>

          {/* --- QnA ---*/}
          <div id="qna">
            <h3 id="questions-logo">Questions & Answers</h3>
            <div id="questions-and-answers">
              <QnA />
            </div>
          </div>

          {/* --- Ratings & Reviews --- */}
          <div id="ratings-reviews-container">
            <RatingsReviews />
          </div>
        </UserContext.Provider>
        </div>
    );
  }
}
