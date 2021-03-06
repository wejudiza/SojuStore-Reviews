import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import OutfitList from './OutfitList.jsx';
import Whirligig from 'react-whirligig';

/// Carousel buttons///
let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.getRelated = this.getRelated.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.mainProduct.id !== this.props.mainProduct.id) {
      this.getRelated()
    }
  }

  getRelated() {
    axios.get(`/api/${this.props.mainProduct.id}`)
      .then((results) => {
        this.setState({
        products: results.data.filter(function(item, pos) {
          return results.data.indexOf(item) == pos;
      })
      })})
      .catch((err) => console.log(err));
  };


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}} className="related-container" onClick={(e) => this.props.click(e, this.props.widget) }>
        <i className={this.state.products.length > 4 ?
        "fas fa-arrow-circle-left fa-2x prev" : " fas fa-arrow-circle-left fa-2x prev hidden"
        } onClick={prev}></i>
        <Whirligig
        ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
        slideBy={1 || 0}
        slideClass={"slide"}
        gutter="6.4em"
        preventScroll={true}>
        {this.state.products.map((id, index) => {
          return (
            <RelatedProducts className="relatedproduct" productId={id} key={index} mainId={this.props.mainId} mainProduct={this.props.mainProduct} updateCurrentProduct={this.props.updateCurrentProduct}/>
          )
        })}
        </Whirligig>
        <i className={this.state.products.length > 4 ?
        "fas fa-arrow-circle-right fa-2x next" : "fas fa-arrow-circle-right fa-2x next hidden"
        } onClick={next}></i>
      </div>
    );
  }
};

export default RelatedProductsList;