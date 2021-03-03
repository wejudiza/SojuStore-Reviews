import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import OutfitList from './OutfitList.jsx'

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.getRelated = this.getRelated.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mainId !== this.props.mainId) {
      this.getRelated(this.props.mainId)
    }
  }

  getRelated(id) {
    axios.get(`/api/${id}`)
      .then((results) => this.setState({
        products: results.data
      }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {this.state.products.map((id, index) => {
          return (
            <RelatedProducts productId={id} key={index} mainId={this.props.mainId}/>
          )
        })}
      </div>
    );
  }
};

export default RelatedProductsList;