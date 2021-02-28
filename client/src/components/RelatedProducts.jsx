import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      id: '',
      name: '',
      category: '',
      default_price: '',
      original_price: '',
      sale_price: '',
      thumbnail_url: '',
      features: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  componentDidMount() {
    this.getInfo(this.props.productId);
    this.getStyles(this.props.productId);
  }

  getInfo(id) {
    axios.get(`api/product_id/${id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category:response.data.category,
          features: response.data.features
        })
      })
  }

  getStyles(id) {
    axios.get(`api/styles/${id}`)
      .then((response) => {
        console.log(response.data.results)
        this.setState({
        original_price: response.data.results[0].original_price,
        sale_price: response.data.results[0].sale_price,
        thumbnail_url: response.data.results[0].photos[0].thumbnail_url
      })})
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="related-products-container">
        <button onClick={this.toggleModal}>open modal</button>
        <div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.toggleModal}>
            <h2>Modal Title</h2>
            <p>Model Body</p>
            <button onClick={this.toggleModal}>close</button>
          </Modal>
        </div>
        <div>
          <img src={this.state.thumbnail_url}></img>
        </div>
        <div>
          {this.state.category}
        </div>
        <div>
          {this.state.name}
        </div>
        <div>
          {this.state.original_price}
        </div>
      </div>
    );
  }
}

export default RelatedProducts;
