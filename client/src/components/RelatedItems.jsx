import React, {useState, useEffect} from 'react';
import axios from 'axios';


const RelatedItems = (props) => {
  const [related, setRelated] = useState([]);
  const [relatedImage, setRelatedImage] = useState('');
  const [relatedName, setRelatedName] = useState('');


  const getRelated = () => {
    axios.get('/api/16392')
      .then((results) => setRelated(results.data))
      .catch((err) => console.log(err))
  }

  const getRelatedImage = () => {
    axios.get('api/styles/16821')
      .then((results) => {
        var thumbNail = results.data.results[0].photos[0].thumbnail_url;
        setRelatedImage(thumbNail)
      })
  }

  const getRelatedName = () => {
    axios.get('api/product_id/16392')
      .then((results) => {
        console.log(results.data.name)
      })
  }


  useState(getRelatedImage, [])
  useState(getRelated, [])
  useState(getRelatedName, [])


  return (
    <div> TESTING HOOKS IN RELATED ITEMS:
      {console.log(related)}
        {related.map((id, index) => {
          return (
            <div key={index}>
              {id}
              <img src={relatedImage}></img>
            </div>
          )
        })}
    </div>

  )
}


export default RelatedItems;


//