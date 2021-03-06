import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import Whirligig from 'react-whirligig';

/// Carousel buttons///
let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitList: []
    };
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }


  addToOutfit() {
    const isFound = this.state.outfitList.find((outfit) => (
      outfit.id === this.props.mainProduct.id
    ))
    if (isFound === undefined) {
      this.setState({
        outfitList: this.state.outfitList.concat(this.props.mainProduct)
      })
    }
  }

  removeProduct(product) {
    this.setState({
      outfitList: this.state.outfitList.filter((outfitItem) => (
        product.id !== outfitItem.id
      ))
    })
  }


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <i class="fas fa-arrow-circle-left fa-2x prev" onClick={prev}></i>
        <Whirligig ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}>
        <div className="add-card">
          <h4 className="add">Add to Outfit</h4>
          <i className="fas fa-plus fa-3x btn" onClick={this.addToOutfit}></i>
          </div>
          {this.state.outfitList.length > 0 ?
            this.state.outfitList.map((outfitItem, index) => {
              return (
                <div className="outfit-card" key={index}>
                  <OutfitCard outfitItem={outfitItem} mainProduct={this.props.mainProduct} removeProduct={this.removeProduct}/>
                </div>
              )
            }): null
          }
          </Whirligig>
          <i class="fas fa-arrow-circle-right fa-2x next" onClick={next}></i>
      </div>
    );
  }
}

export default OutfitList;

{/* <i class="far fa-times-circle btn"></i> */}
