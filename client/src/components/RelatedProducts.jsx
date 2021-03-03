import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { render } from 'react-dom'

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
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo(this.props.productId);
  }


  getInfo(id) {
    axios.get(`api/product_id/${id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category:response.data.category,
          features: response.data.features
        })
      })
    axios.get(`api/styles/${id}`)
    .then((response) => {
      this.setState({
        original_price: response.data.results[0].original_price,
        sale_price: response.data.results[0].sale_price,
        thumbnail_url: response.data.results[0].photos[0].thumbnail_url
    })})
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="card" >
        <i className="far fa-star btn" onClick={this.toggleModal}></i>
          <img src={this.state.thumbnail_url}></img>
          <div>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.toggleModal} ariaHideApp={false} style={customStyles}>
              <h5>Comparing</h5>
              <table className="table">
                <tr>
                  <th>Current Product</th>
                  <th></th>
                  <th>{this.state.name}</th>
                </tr>
                <tr>
                  <td></td>
                  <td>{this.state.features.map((feature, index) => {
                        if (feature.value !== null) {
                          return (
                            <div key={index}>
                            {`${feature.value} ${feature.feature}`}
                            <br/>
                            </div>
                          )
                        } else {
                          return (
                            <td>
                              {feature.feature}
                              <br/>
                            </td>
                          )
                        }
                      })}</td>
                  <td></td>
                </tr>
              </table>
            </Modal>
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
            Stars here
          </div>
        </div>
    );
  }
}

export default RelatedProducts;
