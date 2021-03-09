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

import Slider from 'react-slick';

const images = [
  {src: "https://reactjs.org/logo-og.png"},
  {src: "https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png"},
  {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"},
  {src: "https://www.inovex.de/blog/wp-content/uploads/2022/01/one-year-of-react-native.png"}
]

// App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.signInClick = this.signInClick.bind(this);
    this.signOutClick = this.signOutClick.bind(this);
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

  render() {
    return (
      <div>
        <h1 style={{display: 'flex', justifyContent: 'center', fontFamily: 'Archivo Black, sans-serif', fontSize: '40px', marginBottom: '0'}}> SOJU STORE </h1>
        <p style={{display: 'flex', justifyContent: 'center', marginTop: '0', fontFamily: 'Source Sans Pro, sans-serif', fontSize: '18px'}}>Cute Slogan</p>
        <div style={{position: 'absolute', top: '0.5%'}}>
        <button onClick={this.signInClick}>Sign In</button>
        <button onClick={this.signOutClick}>Sign Out</button>
        </div>
      <UserContext.Provider value={this.state.data}>
        <Product />
        <h3>Related Products</h3>
        <RelatedProductsList mainProduct={this.state.data} updateCurrentProduct={this.updateCurrentProduct}/>
        <h3>Your Outfit</h3>
        <OufitList mainProduct={this.state.data}/>

        <div id="questions">
          <h3>Questions</h3>
          <QnA />
        </div>

        {/* --- Ratings & Reviews --- */}
        { !UserContext ? null : (
          <div id="ratings-reviews-container">
            <RatingsReviews />
          </div>
        ) }

      </UserContext.Provider>
      </div>
    );
  }
}
