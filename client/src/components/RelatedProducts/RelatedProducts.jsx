import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { Checkmark } from 'react-checkmark'


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
      product: {}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }


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
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="related-card" >
        <i className="far fa-star btn" onClick={this.toggleModal}></i>
          <img src={this.state.thumbnail_url} onClick={() => this.props.updateCurrentProduct(this.state.product)}></img>
          <div>
            {/* MODAL WITH TABLE */}
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
          {/* RELATED PRODUCTS CARD */}
          </div>
          <div className="category">
            {this.state.category}
          </div>
          <div className="name">
            {this.state.name}
          </div>
          <div className="price">
            {'$ ' + this.state.original_price}
          </div>
          <div className="stars">
          <ReactStars
            count={5}
            size={20}
            color2={'#ffd700'} />
          </div>
        </div>
    );
  }
}

export default RelatedProducts;
