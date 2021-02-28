import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx'

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.getRelated = this.getRelated.bind(this);
  }

  componentDidMount() {
    this.getRelated()
  }

  getRelated() {
    axios.get('/api/16392')
      .then((results) => this.setState({
        products: results.data
      }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.products.map((id, index) => {
          return (
            <RelatedProducts productId={id} key={index}/>
          )
        })}
      </div>
    );
  }
};

export default RelatedProductsList;