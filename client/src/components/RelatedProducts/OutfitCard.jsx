import React from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';


class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      category: '',
      original_price: '',
      sale_price: '',
      thumbnail_url: '',
    }
    this.getInfo = this.getInfo.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    console.log(this.props)
    this.setState({
      id: this.props.outfit.id,
      category: this.props.outfit.category,
      name: this.props.outfit.name
    })
    axios.get(`/api/styles/${this.props.mainProduct.id}`)
      .then((response) => {
        this.setState({
          thumbnail_url: response.data.results[0].photos[0].thumbnail_url,
          original_price: response.data.results[0].original_price,
          sale_price: response.data.results[0].sale_price
        })
      })
  }

  removeProduct(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <i className="far fa-times-circle fa-2x btn" onClick={this.removeProduct} value="test"></i>
        <img src={this.state.thumbnail_url}></img>
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
    )
  }
}

export default OutfitCard;