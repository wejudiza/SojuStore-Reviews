import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductsModal from './RelatedProductsModal.jsx';
import OutfitList from './OutifitList.jsx'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedIds: [],
      relatedObjects: [],
      show: false,
    };
    this.getRelated = this.getRelated.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getRelatedNames = this.getRelatedNames.bind(this);
  }

  componentDidMount() {
    this.getRelated();
  }

  getRelated() {
    axios.get('/api/16392')
      .then((results) => this.setState({
        relatedIds: results.data,
      }, () => this.getRelatedNames()))
      .catch((err) => console.log(err));
  }

  getRelatedNames() {
    this.state.relatedIds.map((id, index) => {
      axios.get(`api/product_id/${id}`)
        .then((results) => this.setState({
          relatedObjects: this.state.relatedObjects.concat(results.data)
        }));
    })
  };

  toggleModal() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        ********TESTING RELATED ITEMS*********
        {this.state.relatedObjects.map((product, index) => (
          <div key={index} onClick={this.toggleModal} className="product-name">
            <div className="product-category">
              {product.category}
            </div>
            {product.name}
            <div className="product-price">
            {'$ ' + product.default_price}
            <div>
              STAR RATING HERE
            </div>
            </div>
          </div>
        ))}
        <RelatedProductsModal show={this.state.show}/>
        <OutfitList />
      </div>
    );
  }
}

export default RelatedProducts;
