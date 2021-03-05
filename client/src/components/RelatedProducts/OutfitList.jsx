import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import Carousel from "react-elastic-carousel";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

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
    }, () => console.log(this.state.outfitList))
  }


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Carousel breakPoints={breakPoints}>
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
          </Carousel>
      </div>
    );
  }
}

export default OutfitList;

{/* <i class="far fa-times-circle btn"></i> */}
