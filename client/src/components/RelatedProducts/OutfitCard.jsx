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
    this.getWA = this.getWA.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.outfitItem.id !== this.props.outfitItem.id) {
      this.getInfo();
    }
  }

  // helper for reviews stars//
  getWA(metadata) {
    const { ratings } = metadata;
    const waArray = Object.keys(ratings).map((key) => Number(key) * Number(ratings[key]));
    const total = Object.values(ratings).reduce((sum, val) => Number(sum) + Number(val));
    const wa = waArray.reduce((sum, val) => sum + val) / total;
    return wa;
  };


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
          var ratings = response.data;
          if (ratings) {
            let rating = this.getWA(ratings);
            let rounded = roundToFourth(rating);
            this.setState({
                rating: this.state.rating += rounded
              })
          }
        })
  }

  handleClick() {
    this.props.removeProduct(this.props.outfitItem)
  }


  render() {
    return (
      <div>
        <i className="far fa-times-circle btn" onClick={this.handleClick} snapToSlide={false} visibleSlides={4}></i>
        <img src={this.state.thumbnail_url || 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'} className="oufitcardpicture"></img>
        <div className="category">
            {this.state.category}
          </div>
          <div className="name">
            {this.state.name}
          </div>
          <div className="price">
            {this.state.sale_price === null ?
            '$ ' + this.state.original_price
            :
            <>
            <div className="strike">{'$ ' + this.state.original_price}</div>
            {'$ ' + this.state.sale_price}
            </>
          }
          </div>
          <div className="stars">
          <RatingStars rating={this.state.rating} color="#f8ce0b" size="12px"/>
          </div>
      </div>
    )
  }
}

export default OutfitCard;