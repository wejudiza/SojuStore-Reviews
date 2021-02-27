import React, { useState } from 'react';
import axios from 'axios';

class RelatedProductsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        hi from modal
      </div>
    );
  }
}

export default RelatedProductsModal;