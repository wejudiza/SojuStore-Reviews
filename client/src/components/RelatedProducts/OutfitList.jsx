import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitList: []
    };
    this.addToOutfit = this.addToOutfit.bind(this);
  }


  addToOutfit() {
    if (this.state.outfitList.length === 0) {
      this.setState({
        outfitList: this.state.outfitList.concat(this.props.mainProduct)
      })
    } else {
      this.state.outfitList.forEach((outfit) => {
        if (outfit.id !== this.props.mainProduct.id) {
          this.setState({
            outfitList: this.state.outfitList.concat(this.props.mainProduct)
          })
        }
      })
    }
  }


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div className="add-card">
          <h3 className="add">Add to Outfit</h3>
          <i className="fas fa-plus fa-3x btn" onClick={this.addToOutfit}></i>
          </div>
          {this.state.outfitList.length > 0 ?
            this.state.outfitList.map((outfit, index) => {
              return (
                <div className="outfit-card" key={index}>
                  <OutfitCard outfitList={this.state.outfitList}/>
                </div>
              )
            }): null
          }
      </div>
    );
  }
}

export default OutfitList;

{/* <i class="far fa-times-circle btn"></i> */}
