import React, { useState } from 'react';
import axios from 'axios';
import RelatedProductsModal from './RelatedProductsModal.jsx'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      relatedObjects: {},
      show: false,
    };
    this.getRelated = this.getRelated.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getRelated();
  }

  getRelated() {
    axios.get('/api/16392')
      .then((results) => this.setState({
        related: results.data,
      }))
      .catch((err) => console.log(err));
  }

  getRelatedNames(id) {
    axios.get(`api/product_id/${id}`)
      .then((results) => {
        this.setState({
          relatedObjects: results
        });
      });
  };

  toggleModal() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        ********TESTING HOOKS IN RELATED ITEMS*********
        {this.state.related.map((id, index) => (
          <div key={index} onClick={this.toggleModal}>
            {this.getRelatedNames(id)}
            {id}
            <RelatedProductsModal show={this.state.show}/>
          </div>
        ))}
      </div>
    );
  }
}

export default RelatedProducts;
