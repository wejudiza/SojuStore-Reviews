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
      product: {}
    }
    this.getInfo = this.getInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    console.log('previous', prevProps, 'current', this.props)
    if (prevProps.outfitItem.id !== this.props.outfitItem.id) {
      this.getInfo();
    }
  }


  getInfo() {
    this.setState({
      id: this.props.outfitItem.id,
      category: this.props.outfitItem.category,
      name: this.props.outfitItem.name,
      product: this.props.outfitItem
    })
    axios.get(`/api/styles/${this.props.outfitItem.id}`)
      .then((response) => {
        this.setState({
          thumbnail_url: response.data.results[0].photos[0].thumbnail_url,
          original_price: response.data.results[0].original_price,
          sale_price: response.data.results[0].sale_price
        })
      })
  }

  handleClick() {
    this.props.removeProduct(this.props.outfitItem)
  }


  render() {
    return (
      <div>
        <i className="far fa-times-circle fa-2x btn" onClick={this.handleClick}></i>
        <img src={this.state.thumbnail_url} name="test"></img>
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