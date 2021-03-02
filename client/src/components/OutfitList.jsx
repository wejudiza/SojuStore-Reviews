import React from 'react';
import axios from 'axios';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitList: []
    };
  }

  render() {
    return (
      <div>
        <i className="fas fa-times"></i>
      </div>
    );
  }
}

export default OutfitList;
