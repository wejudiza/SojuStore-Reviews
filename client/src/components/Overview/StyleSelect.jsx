import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import GalleryImg from './GalleryImg.jsx';

Modal.setAppElement('#app')

function StyleSelect (props) {
  const [styles, setStyles] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const [defaultStyle, setDefaultStyle] = useState({})
  const [thumbClick, setThumbClick] = useState(false)
  const [defaultPhoto, setDefaultPhoto] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false)

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
  }

  return (
    <div id ="whole-Style">
          {defaultPhoto !== undefined ? <img className="defaultStyle-img" src={defaultPhoto} onClick={() => setIsOpen(!modalIsOpen)}></img> : null}

        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(!modalIsOpen)}>
          <i className="leftArrow"></i>

          <i className="rightArrow"></i>
          <img className="expanded-img" src={defaultPhoto}></img>
        </Modal>

      <div id="Style-Select">
        <div className="category-rating">
         Color:<em>{defaultStyle.name}</em>
        </div>
      {thumbnailModel(thumbnail).map((itemA, index) => (
        <div key={index}>
        {itemA.map((item, index) => (
          <img src={item.thumbnail_url} key={index} className="thumbnail-img" onClick={() => clickThumbnail(item.index, item.url)}></img>
        ))}
        </div>
      ))}
      {defaultStyle.sale_price === null ? <div> $ {defaultStyle.original_price} </div> : <div> <b style={{color:'red'}}>${defaultStyle.sale_price}</b><strike> $ {defaultStyle.original_price} </strike> </div> }
      <ProductInfo default={defaultStyle} />
      <GalleryImg default={defaultStyle} setDefaultPhoto={setDefaultPhoto} />
    </div>
    </div>
  )
}

export default StyleSelect