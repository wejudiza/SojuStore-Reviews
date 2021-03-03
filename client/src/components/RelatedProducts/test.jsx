import React, { useState } from 'react';
import axios from 'axios';

const RelatedProducts
List = () => {
  const [related, setRelated] = useState([]);
  const [relatedImage, setRelatedImage] = useState('');
  const [relatedNames, setRelatedNames] = useState('');
  // const [currentItemId, setCurrentItemId] = useState('');

  const getRelated = () => {
    axios.get('/api/16392')
      .then((results) => setRelated(results.data))
      .catch((err) => console.log(err));
  };

  useState(getRelated, []);

  // const getRelatedImage = (id) => {

  //   axios.get(`api/styles/${id}`)
  //     .then((results) => {
  //       const thumbNail = results.data.results[0].photos[0].thumbnail_url;
  //       setRelatedImage(thumbNail);
  //     });
  // };
  // const getRelatedNames = (id) => {
  //   axios.get(`api/product_id/${id}`)
  //     .then((results) => {
  //       console.log(results.data.name);
  //     });
  // };

  // useState(getRelatedNames, []);

  return (
    <div id="related-products">
      ********TESTING HOOKS IN RELATED PRODUCTS*********
      {related.map((id, index) => (
        <div key={index}>
          {id}
          {/* <img src={relatedImage} alt="" /> */}
        </div>
      ))}
    </div>

  );
};

export default RelatedProductsList;









{this.state.features.map((feature, index) => {
  if (feature.value !== null) {
    return (
      <td>
        {`${feature.value} ${feature.feature}`}
        </td>
    )
  } else {
    return (
      <td>
        {feature.feature}
      </td>
    )
  }
})}