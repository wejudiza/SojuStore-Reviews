import React from 'react';
import axios from 'axios';

export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: [],
    };
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get('/api')
      .then((results) => {
        this.setState({
          data: results.data,
        }, () => { console.log(this.state.data[0].id)});
      })
      .then(() => {
        axios.get(`api/styles/${this.state.data[0].id}`)
          .then((results) => {
            this.setState({
              image: results.data.results,
            }, () => { console.log( this.state.image )})
          });
      })
      .catch((err) => { console.error(err); });
  }

  render() {
    return (
      <div>
        <img src={this.state.image.map((item) => (
          item.photos[0].thumbnail_url
        ))}></img>
       {this.state.data.map((item, index) => (
          <div key={index}>
            {item.name}
          </div>
        ))}
      </div>
    );
  }
}
