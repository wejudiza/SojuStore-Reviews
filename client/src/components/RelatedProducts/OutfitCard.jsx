import React from 'react';
import axios from 'axios';
import RatingStars from '../RatingsReviews/RatingStars.jsx';

//****Ratings helper function*****//
const roundToFourth = (rating) => (Math.round(rating * 4) / 4).toFixed(2);


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
      product: {},
      rating: 0
    }
    this.getInfo = this.getInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
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
      axios.get(`api/reviews/meta/${this.props.outfitItem.id}`)
        .then((response) => {
          var ratings = Object.values(response.data.ratings);
          const ratingsArr = ratings.map((i) => Number(i));
          var total = 0;
          for (var i = 0; i < ratingsArr.length; i++) {
            total += ratingsArr[i];
            var avg = (total / ratingsArr.length) / 2;
          }
          var rounded = roundToFourth(avg)
          this.setState({
            rating: this.state.rating += rounded
          })
        })
  }

  handleClick() {
    this.props.removeProduct(this.props.outfitItem)
  }


  render() {
    return (
      <div>
        <i className="far fa-times-circle btn" onClick={this.handleClick}></i>
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
          <RatingStars rating={this.state.rating} color="#f8ce0b" size="12px"/>
          </div>
      </div>
    )
  }
}

export default OutfitCard;