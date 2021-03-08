import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Checkmark } from 'react-checkmark';
import RatingStars from '../RatingsReviews/RatingStars.jsx';


// Styles for Modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

//****Ratings helper function*****//
const roundToFourth = (rating) => (Math.round(rating * 4) / 4).toFixed(2);


class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      id: '',
      name: '',
      category: '',
      original_price: '',
      sale_price: '',
      thumbnail_url: '',
      features: [],
      mainFeatures: [],
      product: {},
      rating: 0
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getWA = this.getWA.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  getWA(metadata) {
    const { ratings } = metadata;
    const waArray = Object.keys(ratings).map((key) => Number(key) * Number(ratings[key]));
    const total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
    const wa = waArray.reduce((sum, val) => sum + val) / total;
    return wa;
  };


  getInfo() {
    axios.get(`api/product_id/${this.props.productId}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category:response.data.category,
          features: response.data.features,
          product: response.data
        })
      })
    axios.get(`api/styles/${this.props.productId}`)
    .then((response) => {
      this.setState({
        original_price: response.data.results[0].original_price,
        sale_price: response.data.results[0].sale_price,
        thumbnail_url: response.data.results[0].photos[0].thumbnail_url
    })})
    axios.get(`api/product_id/${this.props.mainProduct.id}`)
      .then((response) => {
        this.setState({
          mainFeatures: response.data.features
        })
      })
    axios.get(`api/reviews/meta/${this.props.productId}`)
      .then((response) => {
        // var ratings = Object.values(response.data.ratings);
        // const ratingsArr = ratings.map((i) => Number(i));
        // var total = 0;
        // for (var i = 0; i < ratingsArr.length; i++) {
        //   total += ratingsArr[i];
        //   var avg = (total / ratingsArr.length) / 2;
        // }
        // var rounded = roundToFourth(avg)
        // this.setState({
        //   rating: this.state.rating += rounded
        // })
        console.log(response)
      })
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="related-card" >
          {/* *********RELATED PRODUCTS CARD********** */}
          <div>
            <i className="far fa-star btn" onClick={this.toggleModal}></i>
            <img src={this.state.thumbnail_url} onClick={() => this.props.updateCurrentProduct(this.state.product)}></img>
          </div>

          <div className="category">
            {this.state.category}
          </div>

          <div className="name">
            {this.state.name}
          </div>

          <div className="price">
            {this.state.sale_price === null ?
            '$ ' + this.state.original_price
            :
            <>
            <div className="strike">{'$ ' + this.state.original_price}</div>
            {'$ ' + this.state.sale_price}
            </>
          }
          </div>
          <div className="stars">
            <RatingStars rating={this.state.rating} color="#f8ce0b" size="12px"/>
          </div>
            {/* **********MODAL WITH TABLE********** */}
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.toggleModal} ariaHideApp={false} style={customStyles}>
              <h5>Comparing</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>{this.props.mainProduct.name}</th>
                    <th></th>
                    <th>{this.state.name}</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.features.map((feature, index) => {
                    if (feature.value !== null) {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>{`${feature.value} ${feature.feature}`}</td>
                          <td><Checkmark size="small"/></td>
                        <br/>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>{feature.feature}</td>
                          <td><Checkmark size="small"/></td>
                          <br/>
                        </tr>
                      )
                    }
                  })}
              {this.state.mainFeatures.map((feature, index) => {
                if (feature.value !== null) {
                  return (
                    <tr key={index}>
                      <td><Checkmark size="small"/></td>
                      <td>{`${feature.value} ${feature.feature}`}</td>
                      <td></td>
                    <br/>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={index}>
                      <td><Checkmark size="small"/></td>
                      <td>{feature.feature}</td>
                      <td></td>
                      <br/>
                    </tr>
                  )
                }
              })}
              </tbody>
          </table>
        </Modal>
      </div>
      );
  }
}

export default RelatedProducts;
