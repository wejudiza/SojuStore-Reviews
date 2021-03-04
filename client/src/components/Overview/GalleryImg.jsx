import React, { useState, useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import axios from 'axios';

function GalleryImg(props) {
  const [indexPhoto, setIndexPhoto] = useState(0);

  const handleClickImg = (url, ind) => {
    props.setDefaultPhoto(url)
    setIndexPhoto(ind)
  }

  const defaultThumbModel = (array) => {
    var result = [];
    var finalRes = [];

    for (var i = 0; i < array.length; i++) {
      if (result.length === 7) {
        finalRes.push(result)
        result = [];
        result.push(array[i])
      } else if (i === array.length - 1) {
        array[i].index = i
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i
        result.push(array[i])
      }
    }

    return finalRes
  }

  const changeForwardRight = () => {
    if (indexPhoto === props.default.photos.length - 1) {
      setIndexPhoto(0);
      props.setDefaultPhoto(props.default.photos[indexPhoto].url)
    } else {
      setIndexPhoto(indexPhoto + 1)
      props.setDefaultPhoto(props.default.photos[indexPhoto].url)
    }
  }

  const changeBackwardLeft = () => {
    if (indexPhoto === 0) {
      setIndexPhoto(props.default.photos.length-1)
      props.setDefaultPhoto(props.default.photos[indexPhoto].url)
    } else {
      setIndexPhoto(indexPhoto - 1)
      props.setDefaultPhoto(props.default.photos[indexPhoto].url)
    }
  }

  const slideThumbnailClick = () => {
    let child =
  }

  return (
    <div id="default-thumbnails">
      <i className='leftArrow' onClick={() => changeBackwardLeft()}> </i>
      <i className='rightArrow' onClick={changeForwardRight.bind(this)}> </i>
      {Object.keys(props.default).length > 0 ? defaultThumbModel(props.default.photos).map((item, index) => (
        <div key={index}>
        {item.map((defItem, index) => (
          <img className="default-thumbnail" key={index} src={defItem.thumbnail_url} onClick={() => handleClickImg(defItem.url, defItem.index)}></img>
        ))}
        </div>
      )) : null }
    </div>
  )
}

export default GalleryImg