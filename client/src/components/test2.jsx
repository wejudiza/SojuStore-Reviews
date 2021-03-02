import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductsModal from './RelatedProductsModal.jsx';
import OutfitList from './OutifitList.jsx';
import Modal from 'react-modal';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      relatedIds: [],
      relatedObjects: [],
      relatedStyles: [],
      relatedFeatures: []
    };
    this.getRelated = this.getRelated.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getRelatedNames = this.getRelatedNames.bind(this);
    this.getRelatedStyles = this.getRelatedStyles.bind(this);
  }

  componentDidMount() {
    this.getRelated();
  }

  getRelated() {
    axios.get('/api/16392')
      .then((results) => this.setState({
        relatedIds: results.data,
      }, () => {
        this.getRelatedNames();
        this.getRelatedStyles();
      }))
      .catch((err) => console.log(err));
  }

  getRelatedNames() {
    this.state.relatedIds.map((id, index) => {
      axios.get(`api/product_id/${id}`)
        .then((results) => this.setState({
          relatedObjects: this.state.relatedObjects.concat(results.data),
          relatedFeatures: this.state.relatedFeatures.concat(results.data.features)
        }));
    })
  };

  // results.data.results[0].photos[0].thumbnail_url

  getRelatedStyles() {
    this.state.relatedIds.map((id, index) => {
      axios.get(`api/styles/${id}`)
        .then((results) => this.setState({
          relatedStyles: this.state.relatedStyles.concat(results.data.results)
        }))
    })
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="related-proucts">
        ********Related Products*********
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.toggleModal}>
          <h2>Modal Title</h2>
          <p>Model Body</p>
          <button onClick={this.toggleModal}>close</button>
        </Modal>
        {this.state.relatedObjects.map((product, index) => (
          <div key={index} className="product-name">
            {/* <img src={this.state.relatedStylesImg}></img> */}
            <div>
              <button onClick={this.toggleModal}>Open Modal</button>
            </div>
            <div className="product-category">
              {product.category}
            </div>
            <div className='product-name'>
              {product.name}
            </div>
            <div className="product-price">
              {'$ ' + product.default_price}
            <div>
              STAR RATING HERE
            </div>
          </div>
        </div>
        ))}
        <OutfitList />
      </div>
    );
  }
}
