import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import GalleryImg from './GalleryImg.jsx';
import Default_Expanded from './Def-Expanded.jsx';
import { Checkmark } from 'react-checkmark';


function StyleSelect (props) {
  const [styles, setStyles] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const [defaultStyle, setDefaultStyle] = useState({})
  const [thumbClick, setThumbClick] = useState(false)
  const [defaultPhoto, setDefaultPhoto] = useState('')
  // index is for photo index
  const [indexPhoto, setIndexPhoto] = useState(0);
  const [reset, setReset] = useState()

  useEffect(() => {
    if (props.data !== undefined) {
      axios.get(`/api/styles/${props.data}`)
        .then((results) => setStyles(results.data.results))
        .catch((err) => console.error(err))
    }
  }, [props.data])

  useEffect(() => {
    var res = [];
    {styles.map((item, index) => {
      if (item['default?']) {
        setDefaultStyle(item)
      }
      item.photos.map((item, index) => {
        if (index === 0) {
          res.push(item)
          setThumbnail(res)
        }
      })
    })}
  }, [styles])

  useEffect(() => {
    if (Object.keys(defaultStyle).length > 0) {
      setDefaultPhoto(defaultStyle.photos[0].url)
    }
  }, [defaultStyle])

  const thumbnailModel = (array) => {
    var result = [];
    var finalRes = [];

    for (var i = 0; i < array.length; i++) {
      if (result.length === 4) {
        array[i].index = i
        finalRes.push(result)
        result = [];
        result.push(array[i])
      } else if (i === array.length - 1) {
        array[i].index = i
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i
        result.push(array[i]);
      }
    }

    return finalRes;
  }

  const clickThumbnail = (ind, newPhoto) => {
    setDefaultPhoto(newPhoto)
    var newStyle = styles[ind]
    setDefaultStyle(newStyle);
    setIndexPhoto(0)
    setReset(['Select Size'])
  }

  return (
    <div id ="whole-Style">
      <Default_Expanded default={defaultPhoto} setDefault={setDefaultPhoto} style={defaultStyle} index={indexPhoto} setIndex={setIndexPhoto} allStyle={thumbnail} />
      <div id="Style-Select">
        <div className="container">
        <div className="category-rating" style={{margin: '1.5%', display: 'flex', order: '1', alignSelf: 'flex-end'}}>
         Color:&nbsp;<b>{defaultStyle.name}</b>
        </div>
      {thumbnailModel(thumbnail).map((itemA, index) => (
        <div key={index} style={{justifyContent: 'center', display: 'flex', width: '50%', order: '2', alignSelf: 'flex-end'}}>
        {itemA.map((item, index) => (
          <div key={index} style={{position: 'relative'}}> { defaultStyle.photos[0].thumbnail_url === null ? null : defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? <i style={{position: 'absolute', top: '6%', color: 'whitesmoke', backgroundColor: 'darkred', borderRadius: '50% 50%'}} className="fa fa-check" aria-hidden="true"></i> : null}
          <img src={item.thumbnail_url === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png' : item.thumbnail_url} className="thumbnail-img" style={defaultStyle.photos[0].thumbnail_url === null ? null : defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? {border: '2px solid darkred', boxShadow: '0px 0.5px 0.5px 1.5px darkred'} : null} onClick={() => clickThumbnail(item.index, item.url)}></img>
          </div>
        ))}
        </div>
      ))}
      {defaultStyle.sale_price === null ?
      <div style={{margin: '1.5%', fontSize: '19px', width: '50%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end'}}> $ {defaultStyle.original_price}
      </div> :
      <div style={{order: '3', fontSize: '19px', width: '50%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end'}}>
      <b style={{color:'red', weight: '600'}}>${defaultStyle.sale_price}</b><strike> $ {defaultStyle.original_price} </strike>
      </div> }
      </div>
      <GalleryImg default={defaultStyle} setDefaultPhoto={setDefaultPhoto} setIndex={setIndexPhoto} index={indexPhoto} />
      <ProductInfo reset={reset} default={defaultStyle} />
    </div>
    </div>
  )
}

export default StyleSelect

// checkmark icon -- learn css to place onto selected image
{/* <i class="fa fa-check text-white"></i> */}