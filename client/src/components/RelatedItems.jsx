import React, {useState, useEffect} from 'react';
import axios from 'axios';


const RelatedItems = (props) => {
  const [related, setRelated] = useState([]);
  const [relatedImage, setRelatedImage] = useState('');
  const [relatedName, setRelatedName] = useState('');
  const [currentItemId, setCurrentItemId] = useState('');


  const getRelated = () => {
    axios.get('/api/16392')
      .then((results) => setRelated(results.data))
      .catch((err) => console.log(err))
  }

  const getRelatedImage = (id) => {
    axios.get(`api/styles/${id}`)
      .then((results) => {
        var thumbNail = results.data.results[0].photos[0].thumbnail_url;
        setRelatedImage(thumbNail)
      })
  }

  const getRelatedName = (id) => {
    axios.get(`api/product_id/${id}`)
      .then((results) => {
        console.log(results.data.name)
      })
  }


  useState(getRelated, [])
  // useState(getRelatedImage, [])
  // useState(getRelatedName, [])


  return (
    <div> TESTING HOOKS IN RELATED ITEMS:
        {related.map((id, index) => {
          return (
            <div key={index}>
              {getRelatedName(id)}
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