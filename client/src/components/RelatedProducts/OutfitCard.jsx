import React from 'react';
import axios from 'axios';


class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        hi
        {console.log(this.props)}
      </div>
    )
  }
}

export default OutfitCard;