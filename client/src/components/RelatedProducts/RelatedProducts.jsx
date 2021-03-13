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
      currentFeatures: [],
      filteredFeatures: [],
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

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.getInfo();
    }
  }

  // helper for ratings stars //
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
          category: response.data.category,
          features: response.data.features,
          product: response.data
        })
      })
      axios.get(`api/product_id/${this.props.mainProduct.id}`)
      .then((response) => {
        this.setState({
          currentFeatures: response.data.features
        })
      })
    axios.get(`api/styles/${this.props.productId}`)
    .then((response) => {
      this.setState({
        original_price: response.data.results[0].original_price,
        sale_price: response.data.results[0].sale_price,
        thumbnail_url: response.data.results[0].photos[0].thumbnail_url
    })})
    axios.get(`api/reviews/meta/${this.props.productId}`)
      .then((response) => {
        var ratings = response.data;
        if (ratings) {
          let rating = this.getWA(ratings);
          let rounded = roundToFourth(rating);
          this.setState({
              rating: this.state.rating += rounded
            })
        }
      })
  }


  toggleModal() {
    const newFeatures = this.state.features.map((item) => (
      {...item, item: 0}
    ))
    const newCurrFeatures = this.state.currentFeatures .map((item) => (
      {...item, item: 1}
    ))

    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      features: newFeatures,
      currentFeatures: newCurrFeatures
    }, () => {
      this.setState({
        filteredFeatures: this.state.features.concat(this.state.currentFeatures).filter((feature, index, self) => {
          let temp = self.findIndex((i) => (i.feature === feature.feature && i.value === feature.value && i.item !== feature.item && i.item !== 2))
          if (temp > -1) {
            feature.item = 2;
            return true;
          } else {
            let temp2 = self.findIndex((i) => (i.feature === feature.feature && i.value === feature.value)) === index;
            if (temp2) {
              return true
            }
            return false;
          }
        })
      })
    });
  }

  render() {
    return (
      <div className="related-card" >
          {/* *********RELATED PRODUCTS CARD********** */}
          <div>
            <i className="far fa-star btn" onClick={this.toggleModal}></i>
            <img src={this.state.thumbnail_url || 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'} onClick={() => this.props.updateCurrentProduct(this.state.product)} className="relatedimage" alt="relatedimage"></img>
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
                    <th>{this.state.name}</th>
                    <th></th>
                    <th>{this.props.mainProduct.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredFeatures ?
                    this.state.filteredFeatures.map((feature, key) => {
                      if (feature.value !== null) {
                        if (feature.item === 0) {
                          return (
                            <tr key={key}>
                              <td><Checkmark size="small"/></td>
                              <td className="center">{`${feature.value} ${feature.feature}`}
                                <br/>
                              </td>
                              <td></td>
                            </tr>
                          )
                        } else if (feature.item === 1) {
                          return (
                            <tr key={key}>
                              <td></td>
                              <td className="center">
                                {`${feature.value} ${feature.feature}`}
                                <br/>
                              </td>
                              <td><Checkmark size="small"/></td>
                            </tr>
                          )
                        } else if (feature.item === 2) {
                          return (
                            <tr key={key}>
                              <td><Checkmark size="small"/></td>
                              <td className="center">
                                {`${feature.value} ${feature.feature}`}
                                <br/>
                              </td>
                              <td><Checkmark size="small"/></td>
                            </tr>
                          )
                        }
                      } else {
                        if (feature.item === 0) {
                          return (
                            <tr key={key}>
                              <td><Checkmark size="small"/></td>
                              <td className="center">{`${feature.feature}`}
                                <br/>
                              </td>
                              <td></td>
                            </tr>
                          )
                        } else if (feature.item === 1) {
                          return (
                            <tr key={key}>
                              <td></td>
                              <td className="center">
                                {`${feature.feature}`}
                                <br/>
                              </td>
                              <td><Checkmark size="small"/></td>
                            </tr>
                          )
                        } else if (feature.item === 2) {
                          return (
                            <tr key={key}>
                              <td><Checkmark size="small"/></td>
                              <td className="center">
                                {`${feature.feature}`}
                                <br/>
                              </td>
                              <td><Checkmark size="small"/></td>
                            </tr>
                          )
                        }
                      }
                    })
                    : null
                  }
              </tbody>
          </table>
        </Modal>
      </div>
      );
  }
}

export default RelatedProducts;
